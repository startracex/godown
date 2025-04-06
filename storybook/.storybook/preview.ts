import type { Preview } from "@storybook/web-components";
import { ArgHelper } from "../args";
import "godown";
import { Container } from "./tools/container";

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
    contents: new ArgHelper().type("boolean").category("experimental").arg,
  },
  args: {},
} satisfies Preview;
