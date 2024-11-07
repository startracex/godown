import { RendererMeta } from "../../types";
import render from "./details";

export default {
  title: "display/Details",
  component: "godown-details",
  tags: ["autodocs"],
  render,
  argTypes: {
    summary: {
      control: "text",
    },
    open: {
      control: "boolean",
    },
  },
  args: {
    summary: "Summary",
    open: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
