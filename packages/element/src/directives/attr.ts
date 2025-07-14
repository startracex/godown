import { noChange } from "lit";
import { Directive, directive, type DirectiveResult, type ElementPart, PartType } from "lit/directive.js";

import { isNullable, isNumber, isString } from "sharekit";
import { combineToken } from "./token-list.js";

const noAttribute = (value: any): boolean => isNullable(value) || value === false;

export const updateAttribute = (el: Element, name: string, value: any): void => {
  if (noAttribute(value)) {
    el.removeAttribute(name);
  } else if (value === true) {
    el.setAttribute(name, "");
  } else if (isString(value) || (isNumber(value) && !Number.isNaN(value))) {
    el.setAttribute(name, String(value));
  } else {
    el[name] = value;
  }
};

type DirectiveParams = Record<string, any>;

class AttrDirective extends Directive {
  render(value: DirectiveParams, caller?: (element: Element, name: string, value: any) => void): void {}

  update(part: ElementPart, [value, fn = updateAttribute]: Parameters<this["render"]>): symbol {
    if (value && part.type === PartType.ELEMENT) {
      for (const name in value) {
        fn(part.element, name, value[name]);
      }
    }
    return noChange;
  }
}

/**
 * A directive that sets element attributes.
 * @param value An object with names and values.
 * @param caller A function to call for each attribute, {@link updateAttribute} by default.
 * @returns Directive to set attributes.
 */
export const attr: (
  value: DirectiveParams,
  caller?: (element: Element, name: string, value: any) => void,
) => DirectiveResult<typeof AttrDirective> = directive(AttrDirective);

export const attrToString = (a: DirectiveParams): string =>
  Object.entries(a).reduce((acc, [key, value]) => {
    if (noAttribute(value)) {
      return acc;
    }
    return combineToken(acc, key + (value === true ? "" : `="${value}"`));
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
