import { RendererMeta } from "../../types";
import render from "./card";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {
    footer: false,
    header: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
