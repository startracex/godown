import { booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./switch";

export default {
  title: "input/Switch",
  component: "godown-switch",
  tags: ["autodocs"],
  render,
  argTypes: {
    checked: booleanArg,
    disabled: booleanArg,
    round: booleanArg,
  },
  args: {
    checked: false,
    disabled: false,
    round: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Round = {
  args: {
    round: true,
  },
};
