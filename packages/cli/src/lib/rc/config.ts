import { isArray, isString } from "sharekit";
import glob from "fast-glob";

import type { Format, RuntimeConfig } from "./types.ts";

export const normalizeBuildConfig = (
  buildConfig: RuntimeConfig["build"],
): Record<
  string,
  {
    ignore: string[];
    outputs: {
      format: Format;
      globals?: Record<string, string>;
      name?: string;
      output: string;
      sourcemap?: boolean;
    }[];
  }
>[] => {
  const { outputs } = buildConfig;
  const sharedOptions = {
    globals: buildConfig.globals,
    name: buildConfig.name,
    sourcemap: buildConfig.map,
  };
  return (isArray(outputs) ? outputs : [outputs]).map((outputEntry) => {
    const ignore = [];
    const inputToOptions: Record<
      string,
      {
        ignore: string[];
        outputs: any[];
      }
    > = {};
    for (const [keyPattern, outputOption] of Object.entries(outputEntry)) {
      if (outputOption === null) {
        ignore.push(keyPattern);
        continue;
      }
      inputToOptions[keyPattern] ??= {
        ignore,
        outputs: [],
      };

      if (isString(outputOption)) {
        inputToOptions[keyPattern].outputs.push({
          output: outputOption,
          ...sharedOptions,
        });
        continue;
      }
      for (const [format, output] of Object.entries(outputOption)) {
        inputToOptions[keyPattern].outputs.push({
          ...sharedOptions,
          ignore,
          output,
          format,
        });
      }
    }
    return inputToOptions;
  });
};

const extractPath = (matchPattern: string, fullPath: string): string | null => {
  const matchPatternParts = matchPattern.split("*");
  if (matchPatternParts.length !== 2) {
    return null;
  }

  const [prefix, suffix] = matchPatternParts;

  if (!fullPath.startsWith(prefix) || !fullPath.endsWith(suffix)) {
    return null;
  }

  const startIndex = prefix.length;
  const endIndex = fullPath.length - suffix.length;
  const extracted = fullPath.substring(startIndex, endIndex);

  return extracted;
};

export const isMultipleEntry = (pattern: string): boolean => pattern.includes("*");

export const getNamedInputs = async (pattern: string, ignore: string[]): Promise<Record<string, string>> => {
  const files = await glob(pattern.replace("*", "**/*"), {
    ignore,
  });
  const inputs = {};
  for (const file of files) {
    const extracted = extractPath(pattern, file);
    if (extracted) {
      inputs[extracted] = file;
    }
  }
  return inputs;
};

/**
 * 'xxx/*'     // 'xxx'
 *
 * 'xxx'       // 'xxx'
 *
 * 'xxx/'      // 'xxx'
 *
 * 'xxx/yyy*'  // 'xxx'
 *
 * 'xxx/yyy/*' // 'xxx/yyy'
 *
 * 'xxx/*zzz'  // 'xxx'
 *
 * 'xxx*zzz'   // ''
 */
export const getEntryDir = (pattern: string): string => {
  if (pattern.includes("/*")) {
    return pattern.split("/*")[0];
  }

  const starIndex = pattern.indexOf("*");
  if (starIndex !== -1) {
    const lastSlashIndex = pattern.lastIndexOf("/", starIndex);
    if (lastSlashIndex !== -1) {
      return pattern.substring(0, lastSlashIndex);
    } else {
      return "";
    }
  }

  if (pattern.endsWith("/")) {
    return pattern.slice(0, -1);
  }

  return pattern;
};

const cleanPrefixRe = /^\.\//;
const cleanPattern = (s: string) => s.replace(cleanPrefixRe, "");

export const getEntryNaming = (pattern: string, dir?: string): string => {
  if (dir) {
    if (pattern.startsWith(dir + "/")) {
      pattern = pattern.slice(dir.length + 1);
    } else if (pattern.startsWith(dir)) {
      pattern = pattern.slice(dir.length);
    }
  }
  return cleanPattern(pattern).replace("*", "[name]");
};
