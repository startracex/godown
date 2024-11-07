import { carousel } from "./carousel";

export default {
  title: "display/Carousel",
  component: "godown-carousel",
  tags: ["autodocs"],
  render: (args: any) => carousel(args),
  argTypes: {},
  args: {
    index: 1,
    autoChange: 3000,
  },
};

export const Primary = {};
