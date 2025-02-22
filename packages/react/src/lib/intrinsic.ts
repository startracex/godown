import type { WebComponentProps } from "@lit/react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type _IntrinsicElement<T extends HTMLElement> = DetailedHTMLProps<
  HTMLAttributes<T> & Partial<Omit<T, keyof HTMLElement>>,
  T
>;
export type IntrinsicElement<T extends HTMLElement> = WebComponentProps<T>;
export type IntrinsicTag<T extends keyof HTMLElementTagNameMap> = IntrinsicElement<HTMLElementTagNameMap[T]>;

/**
 * With `@types/react` 18.3.15+:
 *
 * ```ts
 * import type { IntrinsicMap } from "@godown/react/lib/intrinsic.js";
 *
 * declare module "react" {
 *   namespace JSX {
 *     interface IntrinsicElements extends IntrinsicMap {}
 *   }
 * }
 * ```
 */
export type IntrinsicMap<K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = {
  [P in K]: IntrinsicTag<P>;
};
