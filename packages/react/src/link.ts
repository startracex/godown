"use client";
import component from "godown/link.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-link": IntrinsicTag<"godown-link">;
    }
  }
}
