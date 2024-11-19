import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./card";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  render,
  argTypes: {
    footer: booleanArgs,
    header: booleanArgs,
  },
  args: {
    footer: false,
    header: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
