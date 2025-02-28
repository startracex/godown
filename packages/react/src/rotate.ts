"use client";
import Rotate from "godown/rotate.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Rotate);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-rotate": IntrinsicElement<Rotate>;
    }
  }
}
