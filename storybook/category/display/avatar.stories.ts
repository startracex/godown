import { ArgHelper } from "../../args";
import { matrixToBase64, stringToMatrix } from "../../../build/hex-image";
import type { RendererMeta } from "../../types";
import render from "./avatar";

export default {
  title: "display/Avatar",
  component: "godown-avatar",
  tags: ["autodocs"],
  render,
  argTypes: {
    name: new ArgHelper().type("string").default("").arg,
    round: new ArgHelper().type("boolean").default("false").arg,
    src: new ArgHelper().type("string").arg,
  },
  args: {
    name: "S",
    round: false,
  },
} as RendererMeta<typeof render>;

export const Primary = {};

export const WithSrc = {
  args: {
    src: "https://picsum.photos/40",
  },
};
