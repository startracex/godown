import templateReplace from "rollup-plugin-template-replace";
import minifyHtmlParts from "rollup-plugin-minify-html-parts";
import oxc, { type Options } from "rollup-plugin-oxc";
import postcss from "postcss";
import type { Result } from "postcss-load-config";
import type { Plugin } from "rollup";
import { dataToEsm } from "@rollup/pluginutils";
import JSONC from "jsonc-parser";
import JSON5 from "json5";

function json(): Plugin {
  return {
    name: "json",
    transform: function transform(code: string, id: string) {
      if (id.endsWith(".json") || id.endsWith(".jsonc")) {
        const obj = JSONC.parse(code);
        return {
          code: dataToEsm(obj),
          map: { mappings: "" },
        };
      }
      if (id.endsWith(".json5")) {
        const obj = JSON5.parse(code);
        return {
          code: dataToEsm(obj),
          map: { mappings: "" },
        };
      }
    },
  };
}

export default ({
  minify,
  transform,
  resolve,
  compilerOptions,
  postcss: postcssResult,
}: {
  minify?: Options["minify"];
  transform?: Options["transform"];
  resolve?: Options["resolve"];
  compilerOptions?: Options["tsconfigCompilerOptions"];
  postcss?: Result;
} = {}): Plugin[] => [
  json(),
  oxc({
    tsconfigCompilerOptions: compilerOptions,
    minify,
    transform,
    resolve,
  }),
  postcssResult?.plugins?.length && templateReplace({
    tags: ["css"],
    async callback(input) {
      const result = await postcss(postcssResult.plugins).process(input, {
        from: undefined,
        ...postcssResult.options,
      });
      return result.css;
    },
  }),
  minifyHtmlParts(),
];
