import type { CSSResult, ReactiveController, ReactiveControllerHost } from "lit";
import type GodownElement from "../element.js";
import { toStyleSheet } from "../tools/css.js";

type ComputeFn<T> = (host?: T) => string | CSSStyleSheet | CSSResult | null | undefined;

type StyleControllerHost = {
  shadowRoot: ShadowRoot;
} & ReactiveControllerHost;

/**
 * StyleController computes and applies styles when host updated.
 */
export class StyleController<T extends StyleControllerHost = GodownElement> implements ReactiveController {
  host: T;
  styleID: number;
  computeStyle: ComputeFn<T>;

  constructor(host: T, computeStyle: ComputeFn<T>) {
    (this.host = host).addController(this);
    this.computeStyle = computeStyle;
  }

  hostUpdated(): void {
    const sheets = this.host.shadowRoot?.adoptedStyleSheets;
    if (!sheets) {
      return;
    }
    if (this.styleID !== undefined) {
      sheets.splice(this.styleID, 1);
    }
    const styleResult = this.computeStyle(this.host);
    if (!styleResult) {
      this.styleID = undefined;
      return;
    }
    this.styleID = sheets.push(toStyleSheet(styleResult)) - 1;
  }
}

export default StyleController;
