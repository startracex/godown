import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./skeleton";

export default {
  title: "feedback/Skeleton",
  component: "godown-skeleton",
  tags: ["autodocs"],
  render,
  argTypes: {
    animation: new ArgHelper().options([
      "position",
      "opacity",
    ]).arg,
  },
  args: {
    animation: "position",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
