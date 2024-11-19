import { RendererMeta } from "../../types";
import render from "./switch";

export default {
  title: "input/Switch",
  component: "godown-switch",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {
    disabled: false,
    checked: false,
    round: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const Round = {
  args: {
    round: true,
  },
};
