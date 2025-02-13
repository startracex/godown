"use client";
import Input from "godown/input.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Input,
  eventMap<{
    onChange: TargetedCustomEvent<string, Input>;
    onInput: TargetedCustomEvent<string, Input>;
  }>({
    onChange: "change",
    onInput: "input",
  }),
);

export * from "godown/input.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-input": IntrinsicTag<"godown-input">;
    }
  }
}
