"use client";
import Switch from "godown/switch.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Switch,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, InstanceType<typeof Switch>>;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-switch": IntrinsicElement<InstanceType<typeof Switch>>;
    }
  }
}
