import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { create } from "@custom-elements-manifest/analyzer/src/create.js";
import { addFrameworkPlugins } from "@custom-elements-manifest/analyzer/src/utils/cli-helpers.js";
import { findExternalManifests } from "@custom-elements-manifest/analyzer/src/utils/find-external-manifests.js";
import ts from "./_typescript.ts";

const defaults: Options = {
  outdir: "",
  dev: false,
  quiet: false,
  watch: false,
  litelement: false,
  stencil: false,
  fast: false,
  catalyst: false,
  "catalyst-major-2": false,
  dependencies: false,
  cwd: process.cwd(),
  noWrite: false,
};

export interface Options {
  input?: string[];
  outdir?: string;
  dev?: boolean;
  quiet?: boolean;
  watch?: boolean;
  litelement?: boolean;
  stencil?: boolean;
  fast?: boolean;
  catalyst?: boolean;
  "catalyst-major-2"?: boolean;
  dependencies?: boolean;
  plugins?: any[];
  cwd?: string;
  noWrite?: boolean;
}

export async function analyze(config: Options = {}): Promise<any> {
  const mergedOptions = { ...defaults, ...config };
  const { cwd, input } = mergedOptions;

  const modules = input.map((inputPath) => {
    const filePath = resolve(cwd, inputPath);

    const source = readFileSync(filePath).toString();
    return ts.createSourceFile(inputPath, source, ts.ScriptTarget.ESNext, true);
  });

  let thirdPartyCEMs = [];
  if (mergedOptions.dependencies) {
    try {
      const inputResolved = input.map((inputItem) => resolve(cwd, inputItem));
      thirdPartyCEMs = await findExternalManifests(inputResolved, { basePath: cwd });
    } catch {}
  }

  let plugins: any[] = await addFrameworkPlugins(mergedOptions);
  plugins = [...plugins, ...(config.plugins || [])];

  const context = { dev: mergedOptions.dev, thirdPartyCEMs };

  const customElementsManifest = create({ modules, plugins, context });

  if (!config.noWrite) {
    const outDirResolved = resolve(cwd, mergedOptions.outdir);
    if (!existsSync(outDirResolved)) {
      mkdirSync(outDirResolved, { recursive: true });
    }

    writeFileSync(join(outDirResolved, "custom-elements.json"), `${JSON.stringify(customElementsManifest, null, 2)}\n`);
  }

  return customElementsManifest;
}
