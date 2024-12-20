import { attr } from "@godown/element/directives/attr.js";
import type { Flex } from "godown";
import { html } from "lit";

export default (args: Pick<Flex, "content" | "items" | "gap" | "vertical">) =>
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
