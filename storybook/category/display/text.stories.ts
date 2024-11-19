import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./text";

export default {
  title: "display/Text",
  component: "godown-text",
  tags: ["autodocs"],
  render,
  argTypes: {
    underline: {
      options: ["none", "hover", "active", "always"],
      control: {
        type: "select",
      },
      table: {
        defaultValue: {
          summary: "none",
        },
      },
    },
    clip: booleanArgs,
  },
  args: {
    underline: "none",
    clip: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
