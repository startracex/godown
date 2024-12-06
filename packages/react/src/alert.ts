"use client";
import component from "godown/alert.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/alert.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-alert": IntrinsicTag<"godown-alert">;
    }
  }
}
