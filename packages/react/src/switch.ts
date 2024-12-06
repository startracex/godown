"use client";
import component from "godown/switch.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-switch": IntrinsicTag<"godown-switch">;
    }
  }
}
