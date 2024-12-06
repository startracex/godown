"use client";
import component from "godown/dragbox.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/dragbox.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dragbox": IntrinsicTag<"godown-dragbox">;
    }
  }
}
