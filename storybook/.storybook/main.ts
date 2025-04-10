import type { StorybookConfig } from "@storybook/web-components-vite";

export default {
  stories: ["../**/*.stories.ts", "../mdx/*.mdx"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  managerHead: (head) =>
    `${head}
<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
} satisfies StorybookConfig;
