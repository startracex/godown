"use client";
import Tooltip from "godown/tooltip.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Tooltip,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, Tooltip>;
  }>({
    onChange: "change",
  }),
);

export * from "godown/tooltip.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tooltip": IntrinsicTag<"godown-tooltip">;
    }
  }
}
