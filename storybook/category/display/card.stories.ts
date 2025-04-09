import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./card";

export default {
  title: "display/Card",
  component: "godown-card",
  tags: ["autodocs"],
  render,
  argTypes: {
    header: new ArgHelper().type("boolean").default("false").arg,
    footer: new ArgHelper().type("boolean").default("false").arg,
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
