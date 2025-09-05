import JSONC from "jsonc-parser";
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import type { Plugin } from "rollup";
import { dataToEsm } from "@rollup/pluginutils";
import _commonjs from "@rollup/plugin-commonjs";
import templateReplace from "rollup-plugin-template-replace";
import minifyHtmlParts from "rollup-plugin-minify-html-parts";
import oxc from "rollup-plugin-oxc";
import { extname } from "sharekit/path/filepath.js";
import { isTsExt } from "../utils.ts";
import { transpileModule, type CompilerOptions } from "typescript";
import { isNumber, isString } from "sharekit";

export function json(options?: { extensions?: string[] }): Plugin {
  const exts = new Set(options?.extensions ?? [".json", ".jsonc"]);
  return {
    name: "json",
    transform: function transform(code: string, id: string) {
      if (!exts.size) {
        return null;
      }
      const ext = extname(id);
      if (exts.has(ext)) {
        const obj = JSONC.parse(code);
        return {
          code: dataToEsm(obj),
          map: { mappings: "" },
        };
      }
      return null;
    },
  };
}

const isNodeModule = (m?: string | number) => {
  if (!m) {
    return false;
  }
  if (isNumber(m) && m >= 100) {
    return true;
  }
  if (isString(m) && m.toLowerCase().startsWith("node")) {
    return true;
  }
  return false;
};

export function typescript(options: Record<keyof CompilerOptions, any>): Plugin {
  const transpileCompilerOptions = {
    ...options,
    module: isNodeModule(options.module) ? 99 : options.module,
  };
  return {
    name: "typescript",
    transform(code, id) {
      if (isTsExt(extname(id))) {
        const result = transpileModule(code, {
          compilerOptions: transpileCompilerOptions,
          fileName: id,
        });
        return {
          code: result.outputText,
          map: result.sourceMapText,
        };
      }
    },
  };
}

const commonjs = _commonjs as any as typeof _commonjs.default;
export { commonjs, oxc, templateReplace, minifyHtmlParts, html };
