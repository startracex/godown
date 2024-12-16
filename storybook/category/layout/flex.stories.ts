import { ArgHelper, booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./flex";

export default {
  title: "layout/Flex",
  component: "godown-flex",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: booleanArg,
    gap: new ArgHelper().type("string").control("text").arg,
    flexFlow: new ArgHelper().type("string").control("text").arg,
    content: new ArgHelper().type("string").control("text").arg,
    items: new ArgHelper().type("string").control("text").arg,
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
