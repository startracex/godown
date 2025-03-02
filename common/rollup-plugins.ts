import _terser, { type Options as TerserOptions } from "@rollup/plugin-terser";

export const terser = (options: Omit<TerserOptions, "ecma"> & Record<string, any> = {}) => _terser(options);

export { default as commonjs } from "@rollup/plugin-commonjs";
export { nodeResolve } from "@rollup/plugin-node-resolve";
export { default as ts } from "@rollup/plugin-typescript";

// workspace scope
export { cjsShim } from "rollup-plugin-cjs-shim";
export { pruneImports } from "rollup-plugin-prune-imports";
export { default as templateReplace } from "rollup-plugin-template-replace";
export { minifyHtmlParts } from "../plugins/rollup-minify-html-parts";
