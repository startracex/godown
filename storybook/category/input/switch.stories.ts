import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./switch";

export default {
  title: "input/Switch",
  component: "godown-switch",
  tags: ["autodocs"],
  render,
  argTypes: {
    value: new ArgHelper().type("boolean").default("false").arg,
    disabled: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    value: false,
    disabled: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithCustomSize = {
  args: {
    stylex: "--godown-switch-handle-size: 1.55em;",
  },
};

export const WithCustomColor = {
  args: {
    stylex: "background: blueviolet;color: chartreuse;--godown--active: darkorange;",
  },
};
