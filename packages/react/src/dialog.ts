"use client";
import Dialog from "godown/dialog.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(
  Dialog,
  eventMap<{
    onChange: TargetedCustomEvent<boolean, Dialog>;
  }>({
    onChange: "change",
  }),
);

export * from "godown/dialog.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicTag<"godown-dialog">;
    }
  }
}
