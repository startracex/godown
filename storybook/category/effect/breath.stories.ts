import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./breath";
// @ts-ignore
import page from "./breath.mdx";

export default {
  title: "effect/Breath",
  component: "godown-breath",
  tags: ["autodocs"],
  render,
  argTypes: {
    content: new ArgHelper().type("string").arg,
    duration: new ArgHelper().type("string").arg,
  },
  args: {
    content: "Deploy. Preview. Ship.",
    duration: "8s",
  },
  parameters: {
    docs: {
      page: page,
    },
  },
} as RendererMeta<typeof render>;

export const Primary = {};
