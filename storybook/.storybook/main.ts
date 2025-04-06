import type { StorybookConfig } from "@storybook/web-components-vite";

export default {
  stories: [
    "../**/*.stories.ts",
    "../mdx/*.mdx",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  managerHead: (head) =>
    `${head}
<style>
  .sidebar-header button::before,
  .sidebar-header button::after {
    content: none;
  }
  #storybook-explorer-tree [data-action="collapse-root"] {
    flex: 1;
  }
  #list-item-about,
  #list-item-whats-new,
  #list-item-documentation,
  #list-item-shortcuts {
    display: none;
  }
  .sb-bar {
    overflow-x: hidden !important;
  }
  iframe {
    background: none !important;
  }
  textarea {
    max-height: 120px !important;
  }
</style>`,
  previewHead: (head) =>
    `${head}
<style>
  :root {
    font-family: sans-serif;
    font-size: 20px;
  }
  .sbdocs p {
    font-size: 15px;
  }
  #root-inner {

  }
  .rejt-value-node:hover .rejt-value {
    background: none !important;
  }
  .docblock-colorpalette > * > :first-child {
    flex: 0 8em;
  }
  .docblock-colorpalette div {
    background: none;
    border: none;
  }
  #storybook-docs table tbody button {
    white-space: nowrap;
    cursor: pointer;
  }
</style>`,
} satisfies StorybookConfig;
