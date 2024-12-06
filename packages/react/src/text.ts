"use client";
import component from "godown/text.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-text": IntrinsicTag<"godown-text">;
    }
  }
}
