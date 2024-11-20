import { booleanArg } from "../../args";
import { RendererMeta } from "../../types";
import render from "./card";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  render,
  argTypes: {
    footer: booleanArg,
    header: booleanArg,
  },
  args: {
    footer: false,
    header: false,
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
