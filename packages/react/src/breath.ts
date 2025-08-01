"use client";
import Breath from "godown/breath.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Breath);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-breath": IntrinsicElement<Breath>;
    }
  }
}
