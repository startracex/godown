"use client";
import component from "godown/time.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-time": IntrinsicTag<"godown-time">;
    }
  }
}
