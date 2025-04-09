import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render, { withAvatar } from "./chip";

export default {
  title: "display/Chip",
  component: "godown-chip",
  tags: ["autodocs"],
  render,
  argTypes: {
    position: new ArgHelper().options(["top-right", "top-left", "bottom-right", "bottom-left"]).arg,
    dot: new ArgHelper().type("boolean").type("boolean").arg,
    value: new ArgHelper().type("number").arg,
    max: new ArgHelper().type("number").arg,
  },
} as RendererMeta<typeof render>;

export const Primary = {
  args: {
    dot: false,
    value: 5,
  },
};

export const DotBadge = {
  args: {
    dot: true,
  },
};

export const WithMax = {
  args: {
    value: 150,
    max: 99,
  },
};

export const WithCustomColor = {
  args: {
    dot: true,
    stylex: "--godown--primary: #12a1a1;",
  },
};

export const WithOffset = {
  args: {
    dot: true,
    stylex: "--godown-chip--offset: 12.5%;",
  },
  render: withAvatar,
};
