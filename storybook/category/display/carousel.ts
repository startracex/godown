import { attr, loop } from "@godown/element";
import type { Carousel } from "godown";
import { html } from "lit";

export default (args: Carousel) =>
  html`
<godown-carousel ${attr(args)}>

${[
    ...loop(3, (i) =>
      html`  <div style="width:100%;text-align:center;">Carousel item ${i + 1}</div>
`),
  ]}

</godown-carousel>
`;
