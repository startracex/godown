"use client";
import Heading from "godown/heading.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Heading);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-heading": IntrinsicElement<Heading>;
    }
  }
}
