import { attr, loop } from "@godown/element";
import type { Grid } from "godown";
import { html } from "lit";

export default (args: Pick<Grid, "rows" | "columns" | "content" | "items" | "gap">) =>
  html`
<godown-grid ${attr(args)}>
${[
    ...loop(12, (i) =>
      html`  <div>Grid item ${i + 1}</div>
`),
  ]}

</godown-grid>
`;
