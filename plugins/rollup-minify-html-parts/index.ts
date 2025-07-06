import { minify, type MinifyOptions } from "minify-html-parts";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import type { Plugin } from "rollup";

export function minifyHtmlParts(
  {
    include,
    exclude,
    ...options
  }: MinifyOptions & {
    include?: FilterPattern;
    exclude?: FilterPattern;
  } = {},
): Plugin {
  const filter = createFilter(include, exclude);
  return {
    name: "minify-html-parts",
    transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }
      return minify(code, options);
    },
  };
}

export default minifyHtmlParts;
