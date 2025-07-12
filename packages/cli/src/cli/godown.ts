#!/usr/bin/env node
import { Command } from "commander";
import { join, relative } from "node:path";
import { createExternal, getPackageJSON, normalizeModuleFormat, packageExternal } from "../lib/utils.ts";
import { build } from "../lib/build.ts";
import type { OutputOptions } from "rollup";
import { analyze } from "../lib/manifest/analyze.ts";
import { jb, moduleDeclarationDefine, vs } from "../lib/manifest/plugins.ts";
import { getFrameworks } from "../lib/manifest/frameworks.ts";
import { log, style, warn } from "../lib/logger.ts";
import { loadPostcss } from "../lib/load-postcss.ts";
import { BuildEntry } from "../lib/build-entry.ts";
import { loadTsconfig } from "../lib/load-tsconfig.ts";
import thisPackage from "../../package.json" with { type: "json" };
import type { CompilerOptions } from "rollup-plugin-oxc/migrate.js";
import { writeFile } from "fs/promises";
import { globPattern } from "../lib/glob.ts";
import { getCommonDir } from "../lib/path-utils.ts";

const program = new Command();

const cwd = process.cwd();

const stringsExternal = (s: string[]): (id: string) => boolean => {
  const e = s
    .map((s1) => {
      if (s1.startsWith("/") && s1.endsWith("/")) {
        return new RegExp(s1.slice(1, -1));
      }
      return s1;
    }).filter(Boolean);
  return createExternal(e);
};

const getOptions = <T = Record<string, any>>(thisArg): T => {
  return { ...thisArg.opts(), ...program.opts() };
};

const toBoolValue = (v: string | boolean) => {
  return v === true ? v : v !== "0" && v !== "false";
};

const isBoolValue = (v: any): v is boolean => {
  return typeof v === "boolean";
};

const setDtsOrMap = (options: CompilerOptions, {
  dts,
  mode,
  map,
}: {
  dts?: boolean;
  map?: boolean;
  mode?: "lib" | "app";
}) => {
  const isLib = mode === "lib";
  if (isLib && isBoolValue(dts)) {
    options.declaration = dts;
  }

  if (isBoolValue(map)) {
    options.sourceMap = map;
    options.declarationMap = isLib && map && options.declaration;
  }
};

const sOutputs = (output: OutputOptions[]) =>
  output.map((o) => style("cyanBright")`${o.dir || o.file} (${o.format})`).join(", ");

const sSuccess = (time: number, dryRun?: boolean) => {
  return style("greenBright")`build success (${time.toFixed(2)}ms${dryRun ? ", dry-run" : ""}): `;
};

const getOutputOptions = (formats: string[]): OutputOptions[] => {
  return dirOrFileOutputs
    .map((dirOrFile, i) => {
      const format = normalizeModuleFormat(formats[i]);
      return {
        ...dirOrFile,
        format,
      } as OutputOptions;
    })
    .reverse();
};

const buildManifest = async (input: Record<string, string>, options: Record<string, boolean>) => {
  return await analyze({
    input: input,
    plugins: [moduleDeclarationDefine(), vs(), jb()],
  }, options);
};

const getExts = (js?: boolean, jsx?: boolean, json?: boolean) => {
  const result = [".ts", ".mts", ".cts"];
  if (js) {
    result.push(".js", ".mts", ".cjs");
    if (jsx) {
      result.push("jsx");
    }
  }
  if (jsx) {
    result.push("tsx");
  }
  if (json) {
    result.push(".json", ".jsonc");
  }
  return result;
};

const globalSplitRe = /[:=]/;
const getGlobals = (globals?: string[]) => {
  if (!globals) {
    return undefined;
  }
  const _globals = {};
  for (const g of globals) {
    const [key, value] = g.split(globalSplitRe);
    _globals[key] = value;
  }
  return _globals;
};

const dirOrFileOutputs: { dir?: string; file?: string }[] = [];
const formats: string[] = [];
const externals: string[] = [];
const globals: string[] = [];

program
  .name(thisPackage.name)
  .version(thisPackage.version, "-v, --version")
  .description(thisPackage.description)
  .option("--tsconfig", "tsconfig path", "tsconfig.json");

program
  .command("build [pattern...]")
  .alias("b")
  .description("build the package")
  .option("--root", "root directory path")
  .option("-d, --out-dir <output-path>", "output directory path (repeatable)", (value: string) => {
    dirOrFileOutputs.unshift({ dir: value });
    return dirOrFileOutputs;
  })
  .option("-o, --out <output-path>", "output file path (repeatable)", (value: string) => {
    dirOrFileOutputs.unshift({ file: value });
    return dirOrFileOutputs;
  })
  .option(
    "-f, --format <format>",
    "output format (repeatable, aligned to the right according to the output)",
    (value: string) => {
      formats.unshift(value);
      return formats;
    },
  )
  .option("--globals <globals>", "global name (repeatable)", (value: string) => {
    globals.unshift(value);
    return globals;
  })
  .option("--external <external>", "external (repeatable)", (value: string) => {
    externals.unshift(value);
    return externals;
  })
  .option("--name <name>", "output global name")
  .option("--manifest", "generate custom element manifest")
  .option("--mode <mode>", "library (lib) or application (app) mode", (v) => {
    v = v.toLowerCase();
    if (v !== "lib" && v !== "app") {
      throw new Error("unknow build mode");
    }
    return v;
  })
  .option("--map", "emit source map")
  .option("--dts", "emit declaration")
  .option("--dry-run", "dry-run")
  .option("--minify", "minify output", (v) => {
    return toBoolValue(v);
  })
  .action(async function (pattern: string[]) {
    let { tsconfig, fileNames, path } = await loadTsconfig(program.opts().tsconfig);
    let {
      root: rootDir,
      manifest,
      dryRun,
      map,
      globals,
      minify,
      dts,
      name,
      mode = "lib",
    } = getOptions<{
      root?: string;
      manifest?: boolean;
      dryRun?: boolean;
      map?: boolean;
      external?: string[];
      globals?: string[];
      minify: boolean;
      dts?: boolean;
      name?: string;
      mode?: "lib" | "app";
    }>(this);
    const isApp = mode === "app";
    minify ??= isApp;
    rootDir ??= tsconfig.compilerOptions.rootDir ?? cwd;
    let input: string[] | Record<string, string>;
    if (pattern.length) {
      fileNames = await globPattern({
        pattern,
        cwd,
        exts: getExts(tsconfig.compilerOptions.allowJs, tsconfig.compilerOptions.jsx, false),
      });
      const buildEntry = new BuildEntry({ rootDir, files: fileNames });
      if (buildEntry.outOfDir(rootDir)) {
        rootDir = getCommonDir([...buildEntry.fileSet]);
        warn`root directory has changed to "${rootDir}"`;
        buildEntry.root = rootDir;
      }
      input = buildEntry.getFiles();
    } else {
      const buildEntry = new BuildEntry({ rootDir, files: fileNames });
      if (isApp) {
        input = buildEntry.getFiles();
      } else {
        input = buildEntry.getNamedFiles();
      }
    }
    setDtsOrMap(tsconfig.compilerOptions, { mode, dts, map });

    let output = getOutputOptions(formats);
    if (!output.length) {
      output.push({
        dir: relative(cwd, tsconfig.compilerOptions.outDir) || ".",
        format: "esm",
      });
    }
    const _globals = getGlobals(globals);
    output = output.map((o) => {
      o.sourcemap = tsconfig.compilerOptions.sourceMap;
      o.globals = _globals;
      o.name = o.format === "esm" || o.format === "cjs" ? undefined : name;
      return o;
    });
    const [packagePath, packageJSON] = getPackageJSON(cwd);
    if (path) {
      log`TypeScript config found: ${relative(cwd, path)}`;
      if (!fileNames.length) {
        warn`no input includes`;
      }
    }
    const postcssResult = await loadPostcss();
    if (postcssResult.file) {
      log`PostCSS config found: ${relative(cwd, postcssResult.file)}`;
    }

    const start = performance.now();
    if (!dryRun) {
      await build({
        input,
        output,
        packageJSON,
        minify,
        postcss: postcssResult,
        external: mode === "lib"
          ? (externals.length ? stringsExternal(externals) : packageExternal(packageJSON))
          : undefined,
        compilerOptions: tsconfig.compilerOptions,
      });
      if (manifest) {
        const ce = await buildManifest(
          Array.isArray(input)
            ? Object.fromEntries(input.map((i) => [relative(rootDir, i), i]))
            : input,
          getFrameworks(packageJSON),
        );
        let cePath = packageJSON.customElements || packageJSON["custom-elements"];
        if (!cePath) {
          cePath = join(packagePath, "custom-elements.json");
        }
        await writeFile(cePath, JSON.stringify(ce) + "\n");
      }
    }
    const end = performance.now();
    log`${sSuccess(end - start, dryRun)} ${sOutputs(output)}`;
  });

program.command("manifest")
  .description("generate custom element manifest")
  .action(async () => {
    const { tsconfig, fileNames } = await loadTsconfig(program.opts().tsconfig);
    const rootDir = tsconfig.compilerOptions.rootDir || cwd;
    const buildEntry = new BuildEntry({ rootDir, files: fileNames });
    const input = buildEntry.getNamedFiles({
      root: rootDir,
      ext: true,
    });
    const [, packageJSON] = getPackageJSON();
    buildManifest(
      input,
      getFrameworks(packageJSON),
    );
  });

program.parse();
