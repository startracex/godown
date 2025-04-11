import type { Preview } from "@storybook/web-components";
import { ArgHelper } from "../args";
import "godown";
import { Container } from "./tools/container";
import { comparisonDecorator } from "./tools/theme-comparison";
import "../styl/preview.styl";

export default {
  parameters: {
    backgrounds: { disable: true },
    docs: {
      container: Container,
    },
    options: {
      storySort: {
        order: ["Getting started", "Colors", "Contents"],
      },
    },
  },
  globalTypes: {},
  initialGlobals: {},
  argTypes: {
    stylex: new ArgHelper().type("string").arg,
    contents: new ArgHelper().type("boolean").arg,
  },
  args: {},
  decorators: [comparisonDecorator],
} satisfies Preview;
