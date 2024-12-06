"use client";
import component from "godown/breath.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-breath": IntrinsicTag<"godown-breath">;
    }
  }
}
