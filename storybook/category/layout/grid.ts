import { attr } from "@godown/element/directives/attr.js";
import type { Grid } from "godown";
import { html } from "lit";

export default (args: Pick<Grid, "rows" | "columns" | "content" | "items" | "gap">) =>
  html`
<godown-grid ${attr(args)}>

${
    Array(12).fill(undefined).map((_, i) =>
      html`  <div>Grid item ${i + 1}</div>
`
    )
  }
</godown-grid>
`;
