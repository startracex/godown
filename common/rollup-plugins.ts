import { nodeResolve } from "@rollup/plugin-node-resolve";
import _terser, { type Options as TerserOptions } from "@rollup/plugin-terser";
import _minifyLiterals from "rollup-plugin-minify-html-literals";
import templateReplace from "rollup-plugin-template-replace";
import ts2 from "rollup-plugin-typescript2";

const minifyLiterals = (_minifyLiterals as any).default as typeof _minifyLiterals;

const terser = (options: Omit<TerserOptions, "ecma"> & Record<string, any> = {}) => _terser(options);

export { minifyLiterals, nodeResolve, templateReplace, terser, ts2 };
