import { attr, loop } from "@godown/element";
import type { Flex } from "godown";
import { html } from "lit";

export default (args: Pick<Flex, "content" | "items" | "gap" | "vertical">) =>
  html`
<godown-flex ${attr(args)}>

${[
    ...loop(5, (i) =>
      html`  <div>${i + 1}</div>
`),
  ]}

</godown-flex>
`;
