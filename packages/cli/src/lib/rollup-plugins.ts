import templateReplace from "rollup-plugin-template-replace";
import minifyHtmlParts from "rollup-plugin-minify-html-parts";
import oxc, { type Options } from "rollup-plugin-oxc";
import postcss from "postcss";
import type { Result } from "postcss-load-config";
import type { Plugin } from "rollup";
import { dataToEsm } from "@rollup/pluginutils";
import { stripComments } from "jsonc-parser";

function json(): Plugin {
  return {
    name: "json",
    transform: function transform(code: string, id: string) {
      if (id.endsWith(".json") || id.endsWith(".jsonc") || id.endsWith(".json5")) {
        code = stripComments(code);
        const obj = JSON.parse(code);
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
