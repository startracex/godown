"use client";
import component from "godown/text.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/text.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-text": IntrinsicTag<"godown-text">;
    }
  }
}
