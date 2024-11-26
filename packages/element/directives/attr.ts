import { noChange } from "lit";
import { Directive, directive, type ElementPart, PartType } from "lit/directive.js";

import { isNil } from "../tools/lib.js";

export const updateAttribute = (element: Element, name: string, value: any) => {
  if (isNil(value) || value === false) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value === true ? "" : String(value));
  }
};

type DirectiveParams = Record<string, string | boolean | number | null | undefined>;

class AttrDirective extends Directive {
  // eslint-disable-next-line
  render(value: DirectiveParams, caller?: (element: Element, name: string, value: any) => void) {
  }

  update(part: ElementPart, [value, caller]: Parameters<this["render"]>) {
    if (!value) {
      return noChange;
    }
    if (part.type === PartType.ELEMENT) {
      for (const name in value) {
        (caller || updateAttribute)(part.element, name, value[name]);
      }
      return noChange;
    }
  }
}
/**
 * A directive that sets element attributes.
 * @param value An object with attribute names and values.
 */
export const attr = directive(AttrDirective);

const append = (a: string, b: string) => {
  return a ? a + " " + b : b;
};

export const attrToString = (a: DirectiveParams) => {
  return Object.entries(a).reduce((acc, [key, value]) => {
    if (isNil(value) || value === false) {
      return acc;
    }
    return append(acc, key + (value === true ? "" : `="${value}"`));
  }, "");
};

const svgInitials = {
  width: "1em",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
};

export const withInitials = (attrDirective: (a: DirectiveParams) => any, i: DirectiveParams) => (a: DirectiveParams) =>
  attrDirective({
    ...i,
    ...a,
  });

export const svgAttr = withInitials(attr, svgInitials);
export const svgAttrToString = withInitials(attrToString, svgInitials);
