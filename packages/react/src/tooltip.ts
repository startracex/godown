"use client";
import Tooltip from "godown/tooltip.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Tooltip);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tooltip": IntrinsicElement<Tooltip>;
    }
  }
}
