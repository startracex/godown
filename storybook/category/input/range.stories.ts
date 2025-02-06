import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./range";

export default {
  title: "input/Range",
  component: "godown-range",
  tags: ["autodocs"],
  render,
  argTypes: {
    disabled: new ArgHelper().type("boolean").default("false").arg,
    step: new ArgHelper().type("number").default("1").arg,
    value: new ArgHelper().type("number | array").control("object").arg,
    vertical: new ArgHelper().type("boolean").default("false").arg,
  },
  args: {
    disabled: false,
    max: 100,
    min: 0,
    value: [0, 50],
    vertical: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Vertical = {
  args: {
    vertical: true,
  },
};

export const SignalControl = {
  args: {
    value: 70,
  },
};

export const MultipleControl = {
  args: {
    value: [20, 40, 80, 90],
  },
};
