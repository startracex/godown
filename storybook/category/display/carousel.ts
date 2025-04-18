import { attr, loop } from "@godown/element";
import type { Carousel } from "godown";
import { html } from "lit";

export default (args: Carousel) =>
  html`
<godown-carousel ${attr(args)} style="margin: auto;width: 600px; height: 300px;">
${[
    ...loop(3, (i) =>
      html`
  <div style="width:100%;text-align:center;">
    <img src="https://picsum.photos/600/300?random=${i}">
  </div>
`),
  ]}

</godown-carousel>
`;
