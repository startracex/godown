import { globby } from "globby";
import JSONC from "jsonc-parser";
import { readFile } from "node:fs/promises";
import type { OutputOptions } from "rollup";
import { relative } from "sharekit/path/filepath.js";
import { capitalize, isNullable } from "sharekit";

import {
  alignAssign,
  createExternal,
  expandArray,
  filterAssign,
  getPackageJSON,
  normalizeFormat,
  packageExternal,
  stringsExternal,
  trimQuotes,
} from "../../lib/utils.ts";
import { build } from "../../lib/bundle/build-bundle.ts";
import { log, style } from "../../lib/logger.ts";
import { BuildEntry } from "../../lib/build-entry.ts";
import { setupTsconfig } from "../../lib/tsconfig/setup.ts";
import { setupPostcss } from "../../lib/postcss/setup.ts";
import { getBundlerSync } from "../../lib/bundle/get-bundler.ts";
import { buildManifest } from "../../lib/manifest/build-manifest.ts";
import type { RuntimeConfig } from "../../lib/rc/types.ts";
import { rcBundleOptions } from "../../lib/rc/bundle.ts";

const globalSplitRe = /[:=]/;
const getGlobals = (globals?: string[]): Record<string, string> | undefined => {
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

const getExternal = (externals: false | string[], globals: Record<string, string> | undefined, packageJSON) => {
  if (externals === false) {
    return createExternal();
  }
  if (externals?.length) {
    return stringsExternal(externals);
  }
  if (globals) {
    const globalKeys = Object.keys(globals);
    return createExternal(globalKeys);
  }

  return packageExternal(packageJSON);
};

const printBuildSummary = (time: number, dryRun: boolean, output: OutputOptions[]) => {
  log`${
    //
    style("greenBright")`build success (${
      //
      time.toFixed(2)
    }ms${dryRun ? ", dry-run" : ""}):`
  } ${
    //
    output.map((o) => style("cyanBright")`${o.dir || o.file} (${o.format})`).join(", ")
  }`;
};

type BuildCliOptions = {
  tsconfig?: string;
  config: string;
  format?: string[];
  rootDir?: string;
  manifest?: boolean;
  dryRun?: boolean;
  map?: boolean;
  external?: string[];
  globals?: string[];
  minify: boolean;
  dts?: boolean;
  name?: string;
  bundler?: "rollup" | "rolldown";
};

export const runBuild = async (
  pattern: string[],
  dirOrFileOutputs: { dir?: string; file?: string }[],
  {
    tsconfig: tsconfigFindPath,
    config,
    rootDir,
    manifest,
    dryRun,
    map,
    globals: globalsSlice,
    minify,
    dts,
    name,
    bundler,
    format: formats,
    external: externals,
  }: BuildCliOptions,
): Promise<void> => {
  const cwd = process.cwd();
  const patterns = pattern.map((p) => p.replace(/(\\{1,2})/g, "/"));
  const [packagePath, packageJSON] = getPackageJSON(cwd);
  const packageFormat = normalizeFormat(packageJSON.type);
  const packageName = capitalize(packageJSON.name);
  const resolveBuilder = getBundlerSync(bundler, packagePath);
  const postcssResult = await setupPostcss();

  let rcConfig: RuntimeConfig = {};
  if (config) {
    const configFile = await readFile(config, "utf-8");
    rcConfig = JSONC.parse(configFile);
  }
  const tsconfigResult = await setupTsconfig(tsconfigFindPath ?? rcConfig.tsconfig);
  map ??= rcConfig.build?.map;
  dts ??= rcConfig.build?.dts;
  filterAssign(isNullable, tsconfigResult.tsconfig.compilerOptions, {
    sourceMap: map,
    declaration: dts,
    declarationMap: (dts && map) || undefined,
  });

  if (config) {
    if (rcConfig.build) {
      const bundleOpts = (await rcBundleOptions(rcConfig.build)).map((opts) => {
        return {
          ...opts,
          output: opts.output.map((output) => {
            return {
              ...output,
              globals: output.file ? rcConfig.build.globals : undefined,
              name: output.file ? (output.name ?? packageName) : undefined,
              sourcemap: tsconfigResult.tsconfig.compilerOptions.sourceMap,
              format: output.format ?? packageFormat,
              hoistTransitiveImports: false,
            };
          }),
        };
      });
      const start = performance.now();
      if (dryRun) {
        bundleOpts.forEach(({ input, output }) => {
          log`${JSON.stringify({ input, output }, null, 2)}`;
        });
      } else {
        for (const o of bundleOpts) {
          await build({
            input: o.input,
            output: o.output,
            external: getExternal(
              rcConfig.build.external,
              o.output.some((o) => o.globals) ? rcConfig.build.globals : undefined,
              packageJSON,
            ),
            oxcOptions: {
              tsconfig: tsconfigResult.tsconfig,
              minify: rcConfig.build.minify,
            },
            bundler: resolveBuilder,
            postcss: postcssResult,
          });
        }
        if (rcConfig.manifest) {
          await buildManifest({
            rootDir: tsconfigResult.tsconfig.compilerOptions.rootDir,
            fileNames: tsconfigResult.fileNames,
            packagePath,
            packageJSON,
          });
        }
      }
      const end = performance.now();
      printBuildSummary(
        end - start,
        dryRun,
        bundleOpts.flatMap((o) => o.output),
      );
    }
    return;
  }

  const { tsconfig } = tsconfigResult;
  const tsRoot = tsconfigResult.tsconfig.compilerOptions.rootDir ?? tsconfigResult.dir;
  const buildEntry = new BuildEntry({ rootDir: rootDir ?? tsRoot ?? cwd });

  buildEntry.addFiles(
    ...(pattern.length
      ? await globby(patterns, { absolute: true, ignore: ["**/node_modules", "**/.git", "**/*.d.ts"] })
      : tsconfigResult.fileNames),
  );

  if (!dirOrFileOutputs.length) {
    dirOrFileOutputs.push({
      dir: relative(cwd, tsconfigResult.tsconfig.compilerOptions.outDir) || ".",
    });
  }

  const globals = getGlobals(globalsSlice);
  const output = alignAssign(dirOrFileOutputs, {
    format: expandArray(formats, dirOrFileOutputs.length).map(normalizeFormat),
  })
    .reverse()
    .map((o) => {
      return {
        ...o,
        sourcemap: tsconfig.compilerOptions.sourceMap,
        globals: o.file ? globals : undefined,
        name: o.file ? name || packageName : undefined,
        exports: o.format === "cjs" ? "named" : "auto",
        hoistTransitiveImports: false,
      } as OutputOptions;
    });

  const hasFileOutput = dirOrFileOutputs.some((o) => o.file);
  const input: string[] | Record<string, string> = hasFileOutput ? buildEntry.getFiles() : buildEntry.getNamedFiles();

  const start = performance.now();
  if (dryRun) {
    log`${JSON.stringify({ input, output }, null, 2)}`;
  } else {
    await build({
      input,
      output,
      postcss: postcssResult,
      external: getExternal(
        externals?.map((ss) => trimQuotes(ss)),
        output.some((o) => o.globals) ? globals : undefined,
        packageJSON,
      ),
      oxcOptions: {
        tsconfig,
        minify,
      },
      bundler: resolveBuilder,
    });
    if (manifest) {
      await buildManifest({
        rootDir: tsconfig.compilerOptions.rootDir,
        fileNames: tsconfigResult.fileNames,
        packagePath,
        packageJSON,
      });
    }
  }
  const end = performance.now();
  printBuildSummary(end - start, dryRun, output);
};
