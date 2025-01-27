import type { GodownElement } from "../element.js";
import { component } from "./component.js";

/**
 * Decorator to define element and set styles.
 *
 * `option` will call {@link component}.
 *
 * @param name Proto name, wil call `GodownElement.godownConfig.tag(name)` to get the tag name.
 * @param option Omit `tagName` from {@link component} options.
 */
export const godown =
  (name?: string, option?: Omit<(Parameters<typeof component>[0]), "tagName">) =>
  (constructor: typeof GodownElement): void => {
    name ||= constructor.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    constructor.protoName = name;

    const tagName = constructor.godownConfig.tag(name);

    component({
      tagName,
      ...option,
    })(constructor);
  };

export default godown;
