"use client";
import Button from "godown/button.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Button);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-button": IntrinsicElement<InstanceType<typeof Button>>;
    }
  }
}
