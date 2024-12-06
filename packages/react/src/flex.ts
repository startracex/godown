"use client";
import component from "godown/flex.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-flex": IntrinsicTag<"godown-flex">;
    }
  }
}
