"use client";
import Chip from "godown/chip.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Chip);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-chip": IntrinsicElement<Chip>;
    }
  }
}
