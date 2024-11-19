import { RendererMeta } from "../../types";
import render from "./time";

export default {
  title: "display/Time",
  component: "godown-time",
  tags: ["autodocs"],
  render,
  argTypes: {
    gap: {
      control: {
        type: "number",
      },
      table: {
        type: {
          detail: "number of milliseconds gap of update timeout",
          summary: "number",
        },
      },
    },
    timeout: {
      control: {
        type: "number",
        step: 1000,
      },
      table: {
        type: {
          summary: "number",
          detail: "number of milliseconds to wait before updating the time",
        },
      },
    },
  },
  args: {
    format: "YYYY-MM-DD hh:mm:ss UTFZ",
    timeout: 1000,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
