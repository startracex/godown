import autoprefixer from "autoprefixer/lib/autoprefixer";
import type { Plugin } from "postcss";
import _minify from "postcss-minify";

const minify = _minify as Plugin;

export { autoprefixer, minify };
