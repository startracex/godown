import { RendererMeta } from "../../types";
import render from "./router";

export default {
  title: "navigation/Router",
  component: "godown-router",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {
    pathname: "/index",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
