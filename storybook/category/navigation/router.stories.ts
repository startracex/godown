import { stringArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./router";

export default {
  title: "navigation/Router",
  component: "godown-router",
  tags: ["autodocs"],
  render,
  argTypes: {
    pathname: stringArgs,
    baseURL: stringArgs,
    type: {
      control: {
        type: "select",
      },
      options: [
        "united",
        "slotted",
        "field",
      ],
      table: {
        defaultValue: {
          summary: "united",
        },
        type: {
          summary: `"united" | "slotted" | "field"`,
        },
      },
    },
  },
  args: {
    pathname: "/index",
    type: "united",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
