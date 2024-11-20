import { ArgHelper } from "../../args";
import { RendererMeta } from "../../types";
import render from "./grid";

export default {
  title: "layout/Grid",
  component: "godown-grid",
  tags: ["autodocs"],
  render,
  argTypes: {
    columns: new ArgHelper().type("number | string").control("number").arg,
    content: new ArgHelper().type("string").control("text").arg,
    gap: new ArgHelper().type("string").control("text").arg,
    flexFlow: new ArgHelper().type("string").control("text").arg,
    items: new ArgHelper().type("string").control("text").arg,
    rows: new ArgHelper().type("string").control("text").arg,
  },
  args: {
    columns: 5,
    rows: 3,
    gap: "1em",
  },
} as RendererMeta<typeof render>;
export const Primary = {};
