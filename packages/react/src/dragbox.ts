"use client";
import Dragbox from "godown/dragbox.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Dragbox);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-dragbox": IntrinsicElement<Dragbox>;
    }
  }
}
