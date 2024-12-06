"use client";
import component from "godown/details.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-details": IntrinsicTag<"godown-details">;
    }
  }
}
