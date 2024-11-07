import { RendererMeta } from "../../types";
import render from "./flex";

export default {
  title: "layout/Flex",
  component: "godown-flex",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: {
      control: "boolean",
    },
    gap: { control: "text" },
    flexFlow: { control: "text" },
    content: { control: "text" },
    items: { control: "text" },
  },
  args: {
    gap: "1em",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
