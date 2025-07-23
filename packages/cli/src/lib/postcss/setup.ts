import postcssLoadConfig, { type Result } from "postcss-load-config";
import type { Plugin } from "postcss";

import { autoprefixer, csso } from "./plugins.ts";

export const postcssPlugins: Plugin[] = [autoprefixer(["since 2021"]), csso({ restructure: false })];

export const setupPostcss = async (): Promise<Result> => {
  try {
    return await postcssLoadConfig();
  } catch (error) {
    return {
      file: undefined,
      plugins: postcssPlugins,
      options: {},
    };
  }
};
