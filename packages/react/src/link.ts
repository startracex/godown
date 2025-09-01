"use client";
import Link from "godown/link.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Link,
  eventMap<{
    onNavigate: TargetedCustomEvent<
      {
        state: object;
        pathname: string;
      },
      InstanceType<typeof Link>
    >;
  }>({
    onNavigate: "navigate",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-link": IntrinsicElement<InstanceType<typeof Link>>;
    }
  }
}
