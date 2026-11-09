import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/web-components-vite";
import { renderManagerCss } from "./manager-styles.ts";

const require = createRequire(import.meta.url);
const managerCss = renderManagerCss();

export default {
  stories: ["../**/*.stories.ts", "../src/content/*.mdx"],
  staticDirs: ["../public"],
  addons: [getAbsolutePath("@storybook/addon-docs"), getAbsolutePath("@storybook/addon-a11y")],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  managerHead: (head) =>
    `${head}
<style data-godown-manager>${managerCss}</style>`,
} satisfies StorybookConfig;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
