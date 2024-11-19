import { RendererMeta } from "../../types";
import render from "./grid";

export default {
  title: "layout/Grid",
  component: "godown-grid",
  tags: ["autodocs"],
  render,
  argTypes: {
    columns: {
      control: "number",
      table: {
        type: {
          summary: "number | string",
        },
      },
    },
    rows: {
      control: "number",
    },
    gap: { control: "text" },
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
    columns: 5,
    rows: 3,
    gap: "1em",
  },
} as RendererMeta<typeof render>;
export const Primary = {};
