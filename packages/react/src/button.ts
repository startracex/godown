"use client";
import component from "godown/button.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-button": IntrinsicTag<"godown-button">;
    }
  }
}
