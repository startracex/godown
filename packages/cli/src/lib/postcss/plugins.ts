import autoprefixer from "autoprefixer";
import type { Plugin } from "postcss";
import _csso from "postcss-csso";

const csso = _csso as (options?: { restructure?: boolean }) => Plugin;

export { autoprefixer, csso };
