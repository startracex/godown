import { themes } from "@storybook/theming";
import { type Preview } from "@storybook/web-components";
import { ArgHelper } from "../args";

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
  argTypes: {
    stylex: new ArgHelper().type("string").control("text").arg,
    contents: new ArgHelper().type("boolean").control("boolean").category("experimental").arg,
  },
  args: {},
  decorators: (fn, c) => {
    const { dir } = c.globals;
    document.dir = dir;
    window.top!.document.dir = dir;
    return fn();
  },
} satisfies Preview;
