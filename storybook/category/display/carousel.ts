import "godown/carousel.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export const carousel = (args: Pick<Godown.Carousel, "index">) =>
  html`
<godown-carousel ${attr(args)}>

${
    Array(3).fill(undefined).map((_, i) =>
      html`  <div style="width:100%;text-align:center;">Carousel item ${i + 1}</div>
`
    )
  }
</godown-carousel>
`;
