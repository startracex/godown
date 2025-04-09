import { attr, loop } from "@godown/element";
import type { Grid } from "godown";
import { html } from "lit";

export default (args: Grid) =>
  html`
<godown-grid ${attr(args)}>

${[
    ...loop(12, (i) =>
      html`  <div>${i + 1}</div>
`),
  ]}
</godown-grid>
`;
