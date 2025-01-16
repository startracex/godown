import { createComponent } from "@lit/react";
import * as React from "react";

export default function <
  G extends (typeof HTMLElement & { elementTagName?: string }),
  E extends Record<string, any> = object,
>(elementClass: G, events?: E) {
  return createComponent<G["prototype"], E>({
    elementClass: elementClass as unknown as typeof HTMLElement,
    tagName: elementClass.elementTagName,
    react: React,
    events,
  });
}
