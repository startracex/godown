"use client";
import Router from "godown/router.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Router,
  eventMap<{
    onChange: TargetedCustomEvent<
      {
        pathname: string;
        params: Record<string, string>;
        path: string;
        component: unknown;
      },
      Router
    >;
  }>({
    onChange: "change",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-router": IntrinsicElement<Router>;
    }
  }
}
