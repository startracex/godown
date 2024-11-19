import { RendererMeta } from "../../types";
import render from "./input";

export default {
  title: "input/Input",
  component: "godown-input",
  tags: ["autodocs"],
  render,
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
      ],
      table: {
        defaultValue: { summary: "text" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    placeholder: {
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    type: "text",
    variant: "default",
    name: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
