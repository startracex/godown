import { styles } from "./styles.js";

interface ComponentDecoratorsOption {
  tagName: string;
  styles?: Parameters<typeof styles>[0];
  autoDefine?: boolean;
}

/**
 * Decorator to define element and set styles.
 *
 * `styles` will call {@link styles}.
 * @param param0.tagName tagName of the custom element
 * @param param0.styles styles of the custom element
 * @param param0.superStyles  if true, extend the styles from the super class
 * @param param0.autoDefine if true, define the element
 */
export const component = ({
  tagName,
  styles: s,
  autoDefine = false,
}: ComponentDecoratorsOption) =>
(
  constructor: typeof HTMLElement & {
    elementTagName?: string;
    styles?: ComponentDecoratorsOption["styles"];
  },
): void => {
  constructor.elementTagName = tagName;

  if (s) {
    styles(s)(constructor);
  }
  if (autoDefine && !customElements.get(tagName)) {
    customElements.define(tagName, constructor);
  }
};
