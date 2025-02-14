"use client";
import Badge from "godown/badge.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Badge);

export * from "godown/badge.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-badge": IntrinsicElement<Badge>;
    }
  }
}
