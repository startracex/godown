import type { CompilerOptions as CompilerOptionsMigrate } from "rollup-plugin-oxc/migrate.js";
import { parseNative, type TSConfckParseNativeResult } from "tsconfck";
import type { CompilerOptions } from "typescript";

export const loadTsconfig = async (fileName: string): Promise<{
  tsconfig: {
    compilerOptions: CompilerOptionsMigrate & CompilerOptions;
  };
  path?: string;
  fileNames: string[];
}> => {
  try {
    const { tsconfig, tsconfigFile, result } = (await parseNative(fileName)) as TSConfckParseNativeResult;
    const { fileNames } = result;
    return {
      tsconfig,
      path: tsconfigFile,
      fileNames,
    };
  } catch {
    return {
      fileNames: [],
      tsconfig: {
        compilerOptions: {},
      },
    };
  }
};
