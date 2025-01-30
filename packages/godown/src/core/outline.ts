import { css, unsafeCSS, type CSSResult } from "lit";

type OutlineVars = {
  width: string | CSSResult;
  color: string | CSSResult;
};

/**
 * The `OutlineBuilder` class is responsible for generating CSS styles for various types of outlines.
 */
export class OutlineBuilder {
  css: CSSResult;

  /**
   * @param vars.width The width variable of the outline.
   * @param vars.color The color variable of the outline.
   */
  constructor(vars: OutlineVars) {
    const width = unsafeCSS(vars.width);
    const color = unsafeCSS(vars.color);
    this.css = css`
      [outline-type="outline"],
      [outline-type="outline-inset"] {
        outline-width: var(${width});
        outline-color: var(${color});
        outline-style: solid;
      }

      [outline-type="outline-inset"] {
        outline-offset: calc(-1 * var(${width}));
      }

      [outline-type="box-shadow"] {
        box-shadow: 0 0 0 var(${width}) var(${color});
      }

      [outline-type="box-shadow-inset"] {
        box-shadow: inset 0 0 0 var(${width}) var(${color});
      }

      [outline-type="border"] {
        border-width: var(${width});
        border-color: var(${color});
        border-style: solid;
      }
    `;
  }

  get styleSheet(): CSSStyleSheet {
    return this.css.styleSheet;
  }
}

export type OutlineType = "outline" | "outline-inset" | "box-shadow" | "box-shadow-inset" | "border";
