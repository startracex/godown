import { booleanArgs } from "../../args";
import { RendererMeta } from "../../types";
import render from "./flex";

export default {
  title: "layout/Flex",
  component: "godown-flex",
  tags: ["autodocs"],
  render,
  argTypes: {
    vertical: booleanArgs,
    gap: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    flexFlow: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    content: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    items: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    vertical: false,
    gap: "1em",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
