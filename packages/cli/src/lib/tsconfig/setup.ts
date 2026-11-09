import { globby } from "globby";
import { resolve } from "node:path";
import { getTsconfig } from "get-tsconfig";
import type { CompilerOptions as CompilerOptionsMigrate } from "rollup-plugin-oxc/migrate.js";
import { dirname } from "sharekit/path/filepath.js";
import type { CompilerOptions } from "typescript";

import { getExts } from "../utils.ts";

type MergeExclusive<A extends object, B extends object> = A & Omit<B, keyof A>;
interface TSConfig {
  compilerOptions: MergeExclusive<
    CompilerOptionsMigrate & {
      rootDir?: string;
      rootDirs?: string[];
      outDir?: string;
      outFile?: string;
      allowJs?: boolean;
    },
    CompilerOptions
  >;
  include: string[];
  exclude: string[];
}

export const setupTsconfig = async (
  fileName = "tsconfig.json",
): Promise<{
  tsconfig: TSConfig;
  path: string | undefined;
  dir: string | undefined;
  fileNames: string[];
}> => {
  try {
    const result = getTsconfig(fileName);
    if (!result) {
      throw new Error(`tsconfig not found: ${fileName}`);
    }
    const tsconfigFile = result.path;
    const tsconfig = result.config as TSConfig;
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
    const exts = getExts(allowJs, !!jsx);
    tsconfig.include ??= [`**/*{${exts.join(",")}}`];
    const fileNames = await globby(tsconfig.include, {
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
