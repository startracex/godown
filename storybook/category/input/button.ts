import { attr } from "@godown/element";
import type { Button } from "godown";
import { html } from "lit";

export default (args: Button) => {
  return html`
<godown-button ${attr(args)}> Click me </godown-button>
  `;
};

export const sharps = () => {
  return html`
<godown-flex gap=".5em">
  <godown-button style="width: 1.6em;height: 1.6em;">
    <iconify-icon icon="ion:logo-web-component"></iconify-icon>
  </godown-button>
  <godown-button style="width: 1.6em;height: 1.6em;" round>
    <iconify-icon icon="ion:logo-web-component"></iconify-icon>
  </godown-button>
</godown-flex>
  `;
};
