import { attr } from "@godown/element/directives/attr.js";
import type { Carousel } from "godown";
import { html } from "lit";

export default (args: Pick<Carousel, "index" | "autoChange">) =>
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
