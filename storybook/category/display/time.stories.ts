import { RendererMeta } from "../../types";
import render from "./time";

export default {
  title: "display/Time",
  component: "godown-time",
  tags: ["autodocs"],
  render,
  argTypes: {},
  args: {
    format: "YYYY-MM-DD hh:mm:ss UTFZ",
    timeout: 1000,
    gap: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
