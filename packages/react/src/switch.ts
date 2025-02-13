"use client";
import Switch from "godown/switch.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Switch,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, Switch>;
  }>({
    onChange: "change",
  }),
);

export * from "godown/switch.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-switch": IntrinsicTag<"godown-switch">;
    }
  }
}
