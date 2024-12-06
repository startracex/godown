"use client";
import component from "godown/select.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-select": IntrinsicTag<"godown-select">;
    }
  }
}
