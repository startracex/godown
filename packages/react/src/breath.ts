"use client";
import component from "godown/breath.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/breath.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-breath": IntrinsicTag<"godown-breath">;
    }
  }
}
