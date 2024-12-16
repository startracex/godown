import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
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

export const WithCustomColor = {
  args: {
    stylex: "background: #0e1122; color: #c3d1e3; --godown--active: #c3d1e3",
  },
};
