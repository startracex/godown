import type { CSSResult, ReactiveController, ReactiveControllerHost } from "lit";
import { toStyleSheet } from "../tools/css.js";

type ComputeFn = () => string | CSSStyleSheet | CSSResult | null | undefined;

type StyleControllerHost = {
  shadowRoot: ShadowRoot;
} & ReactiveControllerHost;

/**
 * StyleController computes and applies styles when host updated.
 */
export class StyleController implements ReactiveController {
  host: StyleControllerHost;
  styleID: number;
  computeStyle: ComputeFn;

  constructor(host: StyleControllerHost, computeStyle: ComputeFn) {
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
    const styleResult = this.computeStyle();
    if (!styleResult) {
      this.styleID = undefined;
      return;
    }
    this.styleID = sheets.push(toStyleSheet(styleResult)) - 1;
  }
}
