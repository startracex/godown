"use client";
import Split from "godown/split.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Split,
  eventMap<{
    onChange: TargetedCustomEvent<string, InstanceType<typeof Split>>;
    onInput: TargetedCustomEvent<string, InstanceType<typeof Split>>;
  }>({
    onChange: "change",
    onInput: "input",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-split": IntrinsicElement<InstanceType<typeof Split>>;
    }
  }
}
