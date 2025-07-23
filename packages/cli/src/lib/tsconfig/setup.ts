import { globby } from "globby";
import { resolve } from "node:path";
import type { CompilerOptions as CompilerOptionsMigrate } from "rollup-plugin-oxc/migrate.js";
import { dirname } from "sharekit/path/filepath.js";
import { parse, type TSConfckParseNativeResult } from "tsconfck";
import type { CompilerOptions } from "typescript";

import { getExts } from "../utils.ts";

type MergeExclusive<A extends object, B extends object> = A & Omit<B, keyof A>;
export const setupTsconfig = async (
  fileName = "tsconfig.json",
): Promise<{
  tsconfig: {
    compilerOptions: MergeExclusive<
      CompilerOptionsMigrate & {
        rootDir?: string;
        outDir?: string;
      },
      CompilerOptions
    >;
    include: string[];
    exclude: string[];
  };
  path: string | undefined;
  dir: string | undefined;
  fileNames: string[];
}> => {
  try {
    const { tsconfig, tsconfigFile } = (await parse(fileName)) as TSConfckParseNativeResult;
    const dir = dirname(tsconfigFile);
    tsconfig.compilerOptions ??= {};
    const { rootDir, rootDirs, outDir, outFile } = tsconfig.compilerOptions;
    if (rootDir) {
      tsconfig.compilerOptions.rootDir = resolve(dir, rootDir);
    }
    if (rootDirs) {
      tsconfig.compilerOptions.rootDirs = rootDirs.map((rootDir) => resolve(dir, rootDir));
    }
    if (outDir) {
      tsconfig.compilerOptions.outDir = resolve(dir, outDir);
      tsconfig.exclude ??= [outDir];
    }
    if (outFile) {
      tsconfig.compilerOptions.outFile = resolve(dir, outFile);
      tsconfig.exclude ??= [outFile];
    }
    const { jsx, allowJs } = tsconfig.compilerOptions;
    const exts = getExts(allowJs, jsx);
    const fileNames = await globby(tsconfig.include ?? [`**/*{${exts.join(",")}}`], {
      ignore: [...(tsconfig.exclude ?? []), "**/node_modules"],
      absolute: true,
      cwd: dir,
    });
    return {
      tsconfig,
      path: tsconfigFile,
      dir,
      fileNames,
    };
  } catch {
    return {
      fileNames: [],
      path: undefined,
      dir: undefined,
      tsconfig: {
        compilerOptions: {},
        exclude: [],
        include: [],
      },
    };
  }
};
