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
      table: {
        defaultValue: {
          summary: "null",
        },
      },
    },
    max: {
      control: "number",
      table: {
        defaultValue: {
          summary: "100",
        },
      },
    },
    min: {
      control: "number",
      table: {
        defaultValue: {
          summary: "0",
        },
      },
    },
  },
  args: {
    value: null,
    max: 100,
    min: 0,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithValue = {
  args: {
    value: 70,
  },
};
