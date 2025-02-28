"use client";
import Tabs from "godown/tabs.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Tabs,
  eventMap<{
    onSelect: TargetedCustomEvent<number, Tabs>;
  }>({
    onSelect: "select",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tabs": IntrinsicElement<Tabs>;
    }
  }
}
