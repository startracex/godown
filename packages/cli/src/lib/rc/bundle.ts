import type { OutputOptions } from "rollup";

import { getEntryDir, getEntryNaming, getNamedInputs, isMultipleEntry, normalizeBuildConfig } from "./config.ts";
import { flatObjectArray, normalizeFormat } from "../utils.ts";
import type { RuntimeConfig } from "./types.ts";

export const rcBundleOptions = (
  build: RuntimeConfig["build"],
): Promise<
  {
    input: string | Record<string, string>;
    output: OutputOptions[];
  }[]
> => {
  const buildOptionArray = normalizeBuildConfig(build);

  return Promise.all(
    flatObjectArray(buildOptionArray).map(async ([inputPattern, inputEntry]) => {
      const isMulti = isMultipleEntry(inputPattern);
      const input = isMulti ? await getNamedInputs(inputPattern, inputEntry.ignore) : inputPattern;
      const outputs = inputEntry.outputs.map((option) => {
        option.format = option.format ? normalizeFormat(option.format) : undefined;
        const resultOption: OutputOptions = {
          sourcemap: option.sourcemap,
          format: option.format,
        };
        if (isMulti) {
          const dir = getEntryDir(option.output);
          const entryFileNames = getEntryNaming(option.output, dir);
          resultOption.dir = dir;
          resultOption.entryFileNames = entryFileNames;
        } else if (option.output.endsWith("/")) {
          resultOption.dir = option.output.slice(0, -1);
        } else {
          resultOption.file = option.output;
          resultOption.globals = option.globals;
          resultOption.name = option.name;
        }

        return resultOption;
      });

      return {
        input,
        output: outputs,
      };
    }),
  );
};
