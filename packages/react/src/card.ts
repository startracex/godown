"use client";
import Card from "godown/card.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Card);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-card": IntrinsicElement<Card>;
    }
  }
}
