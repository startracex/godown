import { RendererMeta } from "../../types";
import render from "./skeleton";

export default {
  title: "feedback/Skeleton",
  component: "godown-skeleton",
  tags: ["autodocs"],
  render,
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "image",
      ],
    },
    animation: {
      control: "select",
      options: [
        "position",
        "opacity",
      ],
    },
  },
  args: {
    type: "text",
    animation: "position",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
