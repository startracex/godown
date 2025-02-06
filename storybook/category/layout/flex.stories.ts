import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./flex";

export default {
  title: "layout/Flex",
  component: "godown-flex",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: new ArgHelper().type("boolean").default("false").arg,
    gap: new ArgHelper().type("string").arg,
    flexFlow: new ArgHelper().type("string").arg,
    content: new ArgHelper().type("string").arg,
    items: new ArgHelper().type("string").arg,
  },
  args: {
    vertical: false,
    gap: "1em",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Vertical = {
  args: {
    vertical: true,
  },
};
