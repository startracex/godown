import { matrixToBase64, stringToMatrix } from "../../hex-image";
import { RendererMeta } from "../../types";
import render from "./avatar";

export default {
  title: "display/Avatar",
  component: "godown-avatar",
  tags: ["autodocs"],
  render,
  argTypes: {
    src: {
      control: "text",
    },
  },
  args: {
    name: "S",
    round: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithSrc = {
  args: {
    src: matrixToBase64(stringToMatrix("startracex", 6, "#0096cb"), 100, 1),
  },
};
