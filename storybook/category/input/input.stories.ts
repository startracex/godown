import { ArgHelper } from "../../args";
import { RendererMeta } from "../../types";
import render from "./input";

export default {
  title: "input/Input",
  component: "godown-input",
  tags: ["autodocs"],
  render,
  argTypes: {
    type: new ArgHelper().options([
      "text",
      "search",
      "tel",
      "url",
      "email",
      "password",
    ]).arg,
    variant: new ArgHelper().options([
      "default",
      "outline",
    ]).arg,
    placeholder: new ArgHelper().type("text").arg,
  },
  args: {
    type: "text",
    variant: "default",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithPlaceholder = {
  args: {
    placeholder: "Input placeholder",
  },
};

export const WithType = {
  args: {
    type: "password",
  },
};

export const WithOutlineVariant = {
  args: {
    variant: "outline",
  },
};
