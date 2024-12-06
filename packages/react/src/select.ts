"use client";
import component from "godown/select.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/select.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-select": IntrinsicTag<"godown-select">;
    }
  }
}
