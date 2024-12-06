"use client";
import component from "godown/dialog.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicTag<"godown-dialog">;
    }
  }
}
