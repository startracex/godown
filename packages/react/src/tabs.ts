"use client";
import Tabs from "godown/tabs.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Tabs);

export * from "godown/tabs.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-tabs": IntrinsicTag<"godown-tabs">;
    }
  }
}
