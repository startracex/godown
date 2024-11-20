import { booleanArg, stringArg } from "../../args";
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
  },
  args: {
    name: "S",
    round: false,
    src: "",
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithSrc = {
  args: {
    src: matrixToBase64(stringToMatrix("startracex", 6, "#0096cb"), 100, 1),
  },
};
