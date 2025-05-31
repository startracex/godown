import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/web-components-vite";

const require = createRequire(import.meta.url);

export default {
  stories: ["../**/*.stories.ts", "../mdx/*.mdx"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  managerHead: (head) =>
    `${head}
<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
} satisfies StorybookConfig;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
