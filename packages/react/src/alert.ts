"use client";
import Alert from "godown/alert.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Alert,
  eventMap<{
    onClose: TargetedCustomEvent<undefined, Alert>;
  }>({
    onClose: "close",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-alert": IntrinsicElement<Alert>;
    }
  }
}
