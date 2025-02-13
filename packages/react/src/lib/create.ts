import { createComponent, type EventName } from "@lit/react";
import * as React from "react";

interface WithTagName<T> {
  elementTagName?: string;
  new(): T;
}

export type TargetedCustomEvent<D = any, T = HTMLElement> = Omit<CustomEvent<D>, "target"> & {
  target: T;
};

type OrLower<N> = N extends string ? N | Lowercase<N> : never;

export const create = <G extends HTMLElement, E extends Record<string, any>>(
  elementClass: WithTagName<G>,
  events?: E,
) => {
  return createComponent<G, E>({
    elementClass,
    tagName: elementClass.elementTagName,
    react: React,
    events,
  });
};

export const eventMap = <T extends Record<string, any>>(
  eMap: Record<keyof T, any>,
): Record<OrLower<keyof T>, EventName<T[keyof T]>> => {
  if (!eMap) {
    return;
  }
  for (const key in eMap) {
    if (key === key.toLowerCase()) {
      eMap[key] = undefined;
    }
  }
  return eMap;
};

export default create;
