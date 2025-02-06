import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./divider";

export default {
  title: "layout/Divider",
  component: "godown-divider",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    vertical: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Vertical = {
  args: {
    vertical: true,
  },
};
