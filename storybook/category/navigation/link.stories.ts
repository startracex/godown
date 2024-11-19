import { RendererMeta } from "../../types";
import render from "./link";

export default {
  title: "navigation/Link",
  component: "godown-link",
  tags: ["autodocs"],
  render,
  argTypes: {
    type: {
      control: "select",
      options: [
        "push",
        "replace",
        "normal",
      ],
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "normal",
        },
      },
    },
  },
  args: {
    href: "/index",
    type: "normal",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
