"use client";
import Flex from "godown/flex.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Flex);

export * from "godown/flex.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-flex": IntrinsicElement<Flex>;
    }
  }
}
