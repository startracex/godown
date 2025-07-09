import postcssLoadConfig, { type Result } from "postcss-load-config";
import postcssPlugins from "./postcss-plugins.ts";

export const loadPostcss = async (): Promise<Result> => {
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
