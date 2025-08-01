import { html, svg, type TemplateResult } from "lit";

import { svgAttr } from "./attr.js";
import { isString } from "sharekit/is.js";

const h = html;

export const icon =
  (viewBox: string | (string | number)[]) =>
  <A extends IconAttributesParams>(strings: TemplateStringsArray, ...values: any[]): IconRenderer<A> => {
    const body = svg(strings, values);
    const s = isString(viewBox) ? viewBox : viewBox.join(" ");
    const renderer = (attributes?: A) => h`<svg viewBox="${s}"${svgAttr(attributes)}>${body}</svg>`;
    renderer.body = body;
    renderer.viewBox = s;
    return renderer;
  };

type IconAttributesParams = Parameters<typeof svgAttr>[0] & { viewBox?: never };

export interface IconRenderer<A = IconAttributesParams> {
  (attributes?: A): TemplateResult<1>;
  body: TemplateResult<2>;
  viewBox: string;
}
