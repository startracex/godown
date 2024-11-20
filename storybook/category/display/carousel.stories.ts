import { render } from "lit";

import { numberArg } from "../../args";
import { RendererMeta } from "../../types";
import { carousel } from "./carousel";

export default {
  title: "display/Carousel",
  component: "godown-carousel",
  tags: ["autodocs"],
  render: (args: any) => carousel(args),
  argTypes: {
    index: numberArg,
    autoChange: numberArg,
  },
  args: {
    index: 1,
    autoChange: 3000,
  },
} as RendererMeta<typeof render>;

export const Primary = {};
