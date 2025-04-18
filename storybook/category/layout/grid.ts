import { attr, loop } from "@godown/element";
import type { Grid } from "godown";
import { html } from "lit";

export default (args: Grid) =>
  html`
<godown-grid ${attr(args)}>

${[
    ...loop(12, () =>
      html`  <div style="width: 5em;height: 2em;background: gray;"></div>
`),
  ]}
</godown-grid>
`;
