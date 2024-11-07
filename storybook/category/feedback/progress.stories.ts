import { RendererMeta } from "../../types";
import render from "./progress";

export default {
  title: "feedback/Progress",
  component: "godown-progress",
  tags: ["autodocs"],
  render,
  argTypes: {
    value: {
      control: "number",
      min: 0,
    },
  },
  args: {
    value: null,
    max: 100,
    min: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
