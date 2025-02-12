import type { RendererMeta } from "../../types";
import render from "./dragbox";

export default {
  title: "layout/Dragbox",
  component: "godown-dragbox",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {},
} as RendererMeta<typeof render>;

export const Primary = {};
