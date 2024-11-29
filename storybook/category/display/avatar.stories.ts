import { ArgHelper, booleanArg, stringArg } from "../../args";
import { matrixToBase64, stringToMatrix } from "../../hex-image";
import { RendererMeta } from "../../types";
import render from "./avatar";

export default {
  title: "display/Avatar",
  component: "godown-avatar",
  tags: ["autodocs"],
  render,
  argTypes: {
    name: stringArg,
    round: booleanArg,
    src: new ArgHelper().type("string").control("text").arg,
  },
  args: {
    name: "S",
    round: false,
    stylex: "background-color: #007cc7;",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithSrc = {
  args: {
    src: matrixToBase64(stringToMatrix("startracex", 6, "#ffffff"), 100, 1),
  },
};
