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
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
  },
  args: {
    type: "text",
    variant: "default",
    placeholder: "",
    name: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};
