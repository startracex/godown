import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./heading";

export default {
  title: "layout/Heading",
  component: "godown-heading",
  tags: ["autodocs"],
  render,
  argTypes: {
    as: new ArgHelper().options([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]).arg,
    anchor: new ArgHelper().type("string").control("text").default("#").arg,
    side: new ArgHelper().options(["left", "right"]).arg,
  },
  args: {
    as: "h2",
    anchor: "#",
    side: "left",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithID = {
  args: {
    id: "test",
  },
};
