import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import type { Plugin } from "postcss";

const postcssPlugins: Plugin[] = [
  autoprefixer(["since 2021"]),
  csso({ restructure: false }),
];

export default postcssPlugins;
