import { createFilter, FilterPattern } from "@rollup/pluginutils";
import MagicString from "magic-string";
import type { Plugin } from "rollup";

import { Prune } from "./lib/prune.js";

function pruneImports(options: {
  include?: FilterPattern;
  exclude?: FilterPattern;
  prune?: {
    include?: FilterPattern;
    exclude?: FilterPattern;
  };
}): Plugin {
  const state = new Map<string, Prune>();

  const filter = createFilter(options.include, options.exclude);
  const entryFilter = createFilter(options.prune?.include, options.prune?.exclude);
  const skip = new Set();
  return {
    name: "prune-import",
    transform(code, id) {
      // filter for include
      if (filter(id)) {
        const ast = this.parse(code);

        ast.body.forEach(async (node) => {
          if (node.type === "ImportDeclaration") {
            const importSource = node.source.value as string;

            const importSymbols = node.specifiers
              .map((specifier) => {
                return specifier.type === "ImportSpecifier" ? getImportName(specifier) : "";
              })
              .filter(Boolean);

            if (entryFilter(importSource)) {
              skip.add(importSource);
              return;
            }

            const resolvedID = (await this.resolve(importSource, id))?.id;

            if (!resolvedID) {
              return null;
            }

            // filter for prune include
            if (entryFilter(resolvedID)) {
              const prune = new Prune();
              prune.addRequired(resolvedID, ...importSymbols);
              state.set(resolvedID, prune);
            }
          }
        });

        return null;
      }

      if (skip.has(id) || !state.has(id)) {
        return null;
      }

      const ast = this.parse(code);

      const magicString = new MagicString(code);

      const nodeList = [];
      ast.body.forEach((node) => {
        if (node.type === "ImportDeclaration") {
          nodeList.push(node);
          const importSource = node.source.value as string;
          const symbols = node.specifiers.map(getImportName);

          state.get(id).addRequired(importSource, ...symbols);
        }
        if (node.type === "ExportNamedDeclaration") {
          nodeList.push(node);
          const exportNames = node.specifiers.map((specifier) => getExportName(specifier));
          const exportSource = node.source?.value as string | undefined;

          if (exportSource) {
            state.get(id).exports.set(exportSource, new Set(exportNames));
          }
        }
      });

      nodeList.forEach((node) => {
        const { start, end } = node as unknown as {
          start: number;
          end: number;
        };

        if (node.type === "ImportDeclaration") {
          if (node.specifiers.length === 0) {
            magicString.remove(start, end);
          } else {
            const importSource = node.source.value as string;
            if (!state.get(id).exports.has(importSource) && !state.get(id).required.has(importSource)) {
              magicString.remove(start, end);
            }
          }
        } else if (node.type === "ExportNamedDeclaration") {
          const exportNames = node.specifiers.map((specifier) => getExportName(specifier));
          const exportSource = node.source?.value as string | undefined;

          if (exportSource) {
            const requiredSymbols = new Set(...state.get(id).required.values());
            if (exportNames.every((name: string) => !requiredSymbols.has(name))) {
              // all exports are unused
              magicString.remove(start, end);
            }
          }
        }
      });

      // Return modified code if changes were made
      return magicString.hasChanged()
        ? {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        }
        : null;
    },
  };
}

export { pruneImports, pruneImports as default };

function getImportName(specifier): string {
  return specifier.imported.name;
}

function getExportName(specifier): string {
  return specifier.exported.name;
}
