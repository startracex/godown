"use client";
import Text from "godown/text.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Text);

export * from "godown/text.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-text": IntrinsicElement<Text>;
    }
  }
}
