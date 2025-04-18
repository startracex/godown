import { attr, loop } from "@godown/element";
import type { Flex } from "godown";
import { html } from "lit";

export default (args: Flex) =>
  html`
<godown-flex ${attr(args)}>

${[
    ...loop(5, () =>
      html`  <div style="width: 5em;height: 2em;background: gray;"></div>
`),
  ]}
</godown-flex>
`;
