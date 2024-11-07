import { RendererMeta } from "../../types";
import render from "./layout";

export default {
  title: "layout/Layout",
  component: "godown-layout",
  tags: ["autodocs"],
  render,
  argTypes: {
    noHeader: {
      control: "boolean",
    },
    noFooter: {
      control: "boolean",
    },
    sticky: {
      control: "boolean",
    },
  },
  args: {},
} as RendererMeta<typeof render>;

export const Primary = {};
