"use client";
import Divider from "godown/divider.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Divider);

export * from "godown/divider.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-divider": IntrinsicElement<Divider>;
    }
  }
}
