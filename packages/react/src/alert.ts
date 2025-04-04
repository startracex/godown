"use client";
import Alert from "godown/alert.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Alert);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-alert": IntrinsicElement<Alert>;
    }
  }
}
