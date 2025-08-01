import { styles } from "./styles.js";

interface Options {
  tagName: string;
  styles?: Parameters<typeof styles>[0];
  autoDefine?: boolean;
  registry?: CustomElementRegistry;
}

/**
 * Decorator to define element and set styles.
 *
 * `styles` will call {@link styles}.
 * @param param0.tagName tagName of the custom element.
 * @param param0.styles styles of the custom element.
 * @param param0.superStyles  if true, extend the styles from the super class.
 * @param param0.autoDefine if true, define the element.
 * @param param0.registry custom element registry.
 * @returns Decorator.
 */
export const component =
  ({ tagName, styles: s, autoDefine = false, registry = customElements }: Options) =>
  (
    constructor: typeof HTMLElement & {
      elementTagName?: string;
      styles?: Options["styles"];
    },
  ): void => {
    constructor.elementTagName = tagName;

    if (s) {
      styles(s)(constructor);
    }
    if (autoDefine && !registry.get(tagName)) {
      registry.define(tagName, constructor);
    }
  };
