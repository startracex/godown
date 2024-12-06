import { createComponent } from "@lit/react";
import * as React from "react";
export default function <
  G extends (typeof HTMLElement & {
    elementTagName?: string;
  }),
  E extends Record<string, string>,
>(elementClass: G, events?: E) {
  return createComponent<G["prototype"]>({
    elementClass: elementClass as unknown as typeof HTMLElement,
    tagName: elementClass.elementTagName,
    react: React,
    events,
  });
}

export type IntrinsicElement<T extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T> & Partial<T>, T>;
export type IntrinsicTag<T extends keyof HTMLElementTagNameMap> = IntrinsicElement<HTMLElementTagNameMap[T]>;
