import type { Carousel } from "godown";
import { ArgHelper } from "../../lib/args.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import { attr, loop } from "@godown/element";
import { html } from "lit";

export default {
  title: "display/Carousel",
  component: "godown-carousel",
  tags: ["autodocs"],
  argTypes: {
    index: new ArgHelper().type("number").default("0").arg,
    autoChange: new ArgHelper().type("number").default("0").arg,
  },
  args: {
    index: 1,
    autoChange: 3000,
  },
} as StoryMeta<Carousel>;

export const Primary: StoryVariants<Carousel> = {
  render: (args: Carousel) => html`
    <godown-carousel
      ${attr(args)}
      style="margin: auto;width: 600px; height: 300px;"
    >
      ${[
        ...loop(
          3,
          (i) => html`
            <div style="width:100%;text-align:center;">
              <img src="https://picsum.photos/600/300?random=${i}" />
            </div>
          `,
        ),
      ]}
    </godown-carousel>
  `,
};
