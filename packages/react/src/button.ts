"use client";
import Button from "godown/button.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Button);

export * from "godown/button.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-button": IntrinsicTag<"godown-button">;
    }
  }
}
