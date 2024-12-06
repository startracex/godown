"use client";
import component from "godown/dialog.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dialog": IntrinsicTag<"godown-dialog">;
    }
  }
}
