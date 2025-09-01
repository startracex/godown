"use client";
import Dialog from "godown/dialog.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Dialog,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, InstanceType<typeof Dialog>>;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicElement<InstanceType<typeof Dialog>>;
    }
  }
}
