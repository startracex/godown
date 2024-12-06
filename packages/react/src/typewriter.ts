"use client";
import component from "godown/typewriter.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-typewriter": IntrinsicTag<"godown-typewriter">;
    }
  }
}
