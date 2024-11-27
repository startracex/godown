import { booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./card";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  render,
  argTypes: {
    header: booleanArg,
    footer: booleanArg,
  },
  args: {
    header: false,
    footer: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithHeader = {
  args: {
    header: true,
  },
};

export const WithFooter = {
  args: {
    footer: true,
  },
};

export const WithHeaderAndFooter = {
  args: {
    header: true,
    footer: true,
  },
};

export const WithCustomPadding = {
  args: {
    stylex: "--godown-card--padding: 4px;",
  },
};

export const WithCustomColor = {
  args: {
    stylex: "background: #0e1122; color: #c3d1e3;",
  },
};
