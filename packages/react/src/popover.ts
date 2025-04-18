"use client";
import Popover from "godown/web-components/popover/component.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Popover);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-popover": IntrinsicElement<Popover>;
    }
  }
}
