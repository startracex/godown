"use client";
import component from "godown/typewriter.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-typewriter": IntrinsicTag<"godown-typewriter">;
    }
  }
}
