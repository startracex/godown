import { themes } from "@storybook/theming";
import { type Preview } from "@storybook/web-components";

export default {
  parameters: {
    backgrounds: { disable: true },
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        order: ["Getting started", "Colors", "Contents"],
      },
    },
  },
  globalTypes: {},
  initialGlobals: {
    dir: "ltr",
  },
  args: {},
  decorators: (fn, c) => {
    const { dir } = c.globals;
    document.dir = dir;
    window.top!.document.dir = dir;
    return fn();
  },
} satisfies Preview;
