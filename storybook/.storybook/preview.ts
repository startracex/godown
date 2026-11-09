import type { Preview } from "@storybook/web-components-vite";
import { ArgHelper } from "../src/lib/args.ts";
import "godown";
import "iconify-icon";
import { Container } from "./tools/container.tsx";
import { comparisonDecorator } from "./tools/theme-comparison.tsx";
import "../styl/preview.styl";

export default {
  parameters: {
    backgrounds: { disabled: true },
    docs: {
      codePanel: true,
      container: Container,
    },
    options: {
      storySort: {
        order: ["Getting started", "Colors", "Contents", "About"],
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
