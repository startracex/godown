"use client";
import component from "godown/dragbox.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dragbox": IntrinsicTag<"godown-dragbox">;
    }
  }
}
