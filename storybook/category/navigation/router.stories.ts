import { ArgHelper, stringArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./router";

export default {
  title: "navigation/Router",
  component: "godown-router",
  tags: ["autodocs"],
  render,
  argTypes: {
    pathname: stringArg,
    baseURL: stringArg,
    type: new ArgHelper().options([
      "united",
      "slotted",
      "field",
    ]).arg,
  },
  args: {
    pathname: "/index",
    type: "united",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
