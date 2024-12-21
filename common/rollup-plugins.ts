import _terser, { type Options as TerserOptions } from "@rollup/plugin-terser";
import _minifyLiterals from "rollup-plugin-minify-html-literals";

export const minifyLiterals = (_minifyLiterals as any).default as typeof _minifyLiterals;
export const terser = (options: Omit<TerserOptions, "ecma"> & Record<string, any> = {}) => _terser(options);

export { default as commonjs } from "@rollup/plugin-commonjs";
export { nodeResolve } from "@rollup/plugin-node-resolve";
export { default as ts2 } from "rollup-plugin-typescript2";

// workspace scope
export { cjsShim } from "rollup-plugin-cjs-shim";
export { pruneImports } from "rollup-plugin-prune-imports";
export { default as templateReplace } from "rollup-plugin-template-replace";
