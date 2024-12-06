"use client";
import component from "godown/card.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-card": IntrinsicTag<"godown-card">;
    }
  }
}
