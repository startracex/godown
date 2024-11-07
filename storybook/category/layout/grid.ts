import "godown/grid.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Grid, "rows" | "columns" | "content" | "items" | "gap">) =>
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
