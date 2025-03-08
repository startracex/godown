import MagicString from "magic-string";
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
      code = minify(code, options);
      return {
        code,
        map: new MagicString(code).generateMap({ hires: true }),
      };
    },
  };
}

export default minifyHtmlParts;
