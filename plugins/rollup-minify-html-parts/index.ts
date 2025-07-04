import { minify, type MinifyOptions } from "minify-html-parts";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";

export function minifyHtmlParts(
  options?: MinifyOptions & {
    include?: FilterPattern;
    exclude?: FilterPattern;
  },
) {
  const filter = createFilter(options?.include, options?.exclude);
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
