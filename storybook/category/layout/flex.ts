import "godown/flex.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Flex, "content" | "items" | "gap" | "vertical">) =>
  html`
<godown-flex ${attr(args)}>

${
    Array(5).fill(undefined).map((_, i) =>
      html`  <div>Flex item ${i + 1}</div>
`
    )
  }
</godown-flex>
`;
