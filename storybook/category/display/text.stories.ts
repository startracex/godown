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
    },
    clip: {
      control: "boolean",
    },
  },
  args: {
    underline: "none",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
