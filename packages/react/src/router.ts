"use client";
import component from "godown/router.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-router": IntrinsicTag<"godown-router">;
    }
  }
}
