"use client";
import Card from "godown/card.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Card);

export * from "godown/card.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-card": IntrinsicTag<"godown-card">;
    }
  }
}
