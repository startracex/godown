"use client";
import Typewriter from "godown/typewriter.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Typewriter,
  eventMap<{
    onWrite: TargetedCustomEvent<string, Typewriter>;
    onDone: TargetedCustomEvent<string, Typewriter>;
  }>({
    onWrite: "write",
    onDone: "done",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-typewriter": IntrinsicElement<Typewriter>;
    }
  }
}
