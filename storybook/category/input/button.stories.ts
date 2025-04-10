import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./button";

export default {
  title: "input/Button",
  component: "godown-button",
  tags: ["autodocs"],
  render,
  argTypes: {
    content: new ArgHelper().type("string").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
    plain: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    round: false,
    plain: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithCustomColor = {
  args: {
    stylex: "background: #a41515; color: #ffffff;",
  },
};
