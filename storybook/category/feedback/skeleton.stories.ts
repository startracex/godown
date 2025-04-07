import type { RendererMeta } from "../../types";
import render from "./skeleton";

export default {
  title: "feedback/Skeleton",
  component: "godown-skeleton",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {},
} as RendererMeta<typeof render>;

export const Primary = {};
