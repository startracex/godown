import { booleanArg } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./switch";

export default {
  title: "input/Switch",
  component: "godown-switch",
  tags: ["autodocs"],
  render,
  argTypes: {
    value: booleanArg,
    disabled: booleanArg,
  },
  args: {
    value: false,
    disabled: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Round = {
  args: {
    round: true,
  },
};
