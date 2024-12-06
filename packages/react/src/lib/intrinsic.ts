import type * as React from "react";

export type IntrinsicElement<T extends HTMLElement> = React.DetailedHTMLProps<
  & React.HTMLAttributes<T>
  & Partial<Omit<T, keyof HTMLElement>>,
  T
>;
export type IntrinsicTag<T extends keyof HTMLElementTagNameMap> = IntrinsicElement<HTMLElementTagNameMap[T]>;
