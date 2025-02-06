import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./grid";

export default {
  title: "layout/Grid",
  component: "godown-grid",
  tags: ["autodocs"],
  render,
  argTypes: {
    columns: new ArgHelper().type("string | number").control("number").arg,
    content: new ArgHelper().type("string").arg,
    gap: new ArgHelper().type("string").arg,
    flexFlow: new ArgHelper().type("string").arg,
    items: new ArgHelper().type("string").arg,
    rows: new ArgHelper().type("string | number").control("number").arg,
  },
  args: {
    columns: 5,
    rows: 3,
    gap: "1em",
  },
} as RendererMeta<typeof render>;
export const Primary = {};
