"use client";
import component from "godown/rotate.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-rotate": IntrinsicTag<"godown-rotate">;
    }
  }
}
