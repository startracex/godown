import { ArgHelper } from "../../args";
import type { RendererMeta } from "../../types";
import render from "./carousel";

export default {
  title: "display/Carousel",
  component: "godown-carousel",
  tags: ["autodocs"],
  render: (args: any) => render(args),
  argTypes: {
    index: new ArgHelper().type("number").default("0").arg,
    autoChange: new ArgHelper().type("number").default("0").arg,
  },
  args: {
    index: 1,
    autoChange: 3000,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
