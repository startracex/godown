import { noChange } from "lit";
import { Directive, directive, type DirectiveResult, type ElementPart, PartType } from "lit/directive.js";

import { fuse, isNil } from "../tools/lib.js";

const append = fuse;

export const updateAttribute = (element: Element, name: string, value: any): void => {
  if (isNil(value) || value === false) {
    element.removeAttribute(name);
  } else if (
    value === true ||
    typeof value === "string" ||
    (typeof value === "number" && !isNaN(value))
  ) {
    element.setAttribute(name, value === true ? "" : String(value));
  }
};

type DirectiveParams = Record<string, string | boolean | number | null | undefined>;

class AttrDirective extends Directive {
  render(value: DirectiveParams, caller?: (element: Element, name: string, value: any) => void): void {
  }

  update(part: ElementPart, [value, caller]: Parameters<this["render"]>): symbol {
    if (value && part.type === PartType.ELEMENT) {
      for (const name in value) {
        (caller || updateAttribute)(part.element, name, value[name]);
      }
    }
    return noChange;
  }
}

/**
 * A directive that sets element attributes.
 * @param value An object with attribute names and values.
 * @param caller A function to call for each attribute.
 * @returns Directive to set attributes.
 */
export const attr: (
  value: DirectiveParams,
  caller?: (element: Element, name: string, value: any) => void,
) => DirectiveResult<typeof AttrDirective> = directive(AttrDirective);

export const attrToString = (a: DirectiveParams): string =>
  Object.entries(a).reduce((acc, [key, value]) => {
    if (isNil(value) || value === false) {
      return acc;
    }
    return append(acc, key + (value === true ? "" : `="${value}"`));
  }, "");

const svgInitials = {
  width: "1em",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
};

export const withInitials =
  (attrDirective: (a: DirectiveParams) => any, i: DirectiveParams) => (a: DirectiveParams): any =>
    attrDirective({
      ...i,
      ...a,
    });

export const svgAttr: (a: DirectiveParams) => DirectiveResult<typeof AttrDirective> = withInitials(attr, svgInitials);
export const svgAttrToString: (a: DirectiveParams) => string = withInitials(attrToString, svgInitials);

export default attr;
