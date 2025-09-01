"use client";
import Skeleton from "godown/skeleton.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Skeleton);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-skeleton": IntrinsicElement<InstanceType<typeof Skeleton>>;
    }
  }
}
