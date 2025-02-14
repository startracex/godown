"use client";
import Split from "godown/split.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Split,
  eventMap<{
    onChange: TargetedCustomEvent<string, Split>;
    onInput: TargetedCustomEvent<string, Split>;
  }>({
    onChange: "change",
    onInput: "input",
  }),
);

export * from "godown/split.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-split": IntrinsicElement<Split>;
    }
  }
}
