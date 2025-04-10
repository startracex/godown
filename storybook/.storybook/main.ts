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
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  .search-field button,
  #storybook-explorer-menu .search-result-item,
  #storybook-explorer-menu button,
  .sidebar-subheading-action,
  .sidebar-header button {
    background: none !important;
    color: currentColor !important;
  }
  [data-theme="dark"] .sidebar-item:hover {
    background: hsl(0deg 0% 10%);
  }
  [data-theme="light"] .sidebar-item:hover {
    background: hsl(0deg 0% 90%)
  }
  [data-testid="tooltip"] * {
    color: currentColor !important;
  }
  [data-theme="dark"] [data-testid="tooltip"] button:hover {
    background: hsl(0deg 0% 10%) !important;;
  }
  #storybook-explorer-menu svg,
  #storybook-explorer-tree .sidebar-item svg {
    color: currentColor;
  }
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
  .sb-bar > button {
    width: 100%;
  }
  .sb-bar > div > div {
    margin: 0;
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
  #storybook-docs p {
    font-size: 15px;
  }
  #storybook-docs :is(h1, h2, h3, h4, h5, h6) a {
    margin-left: -24px;
  }
  [data-theme="dark"] #storybook-docs a {
    color: hsl(210 100% 50%)
  }
  #root-inner {
    font-size: 22px;
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
