"use client";
import component from "godown/time.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-time": IntrinsicTag<"godown-time">;
    }
  }
}
