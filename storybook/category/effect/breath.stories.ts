import { ArgHelper } from "../../args";
import { RendererMeta } from "../../types";
import render from "./breath";
import page from "./breath.mdx";

export default {
  title: "effect/Breath",
  component: "godown-breath",
  tags: ["autodocs"],
  render,
  argTypes: {
    text: new ArgHelper().type("string").arg,
    duration: new ArgHelper().type("string").arg,
  },
  args: {
    text: "Hello world",
    duration: "3s",
  },
  parameters: {
    docs: {
      page: page,
    },
  },
} as RendererMeta<typeof render>;

export const Primary = {};
