import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render, { withAvatar } from "./badge";

export default {
  title: "display/Badge",
  component: "godown-badge",
  tags: ["autodocs"],
  render,
  argTypes: {
    position: new ArgHelper().options(["top-right", "top-left", "bottom-right", "bottom-left"]).arg,
    value: new ArgHelper().type("number").control("number").arg,
    dot: new ArgHelper().type("boolean").control("boolean").arg,
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
    stylex: "--godown-badge--background: lightgreen;",
  },
};

export const WithAvatar = {
  args: {
    dot: true,
    stylex: "--godown-badge--offset: 12.5%;",
  },
  render: withAvatar,
};
