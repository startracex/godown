import { css, html, property } from "../../_deps.js";
import { godown } from "../../decorators/godown.js";
import { styles } from "../../decorators/styles.js";
import { GodownElement } from "../../proto/godown-element.js";
import { cssGlobalVars } from "../../styles/global.js";

const protoName = "progress";

/**
 * {@linkcode Progress} similar to  progress.
 */
@godown(protoName)
@styles(css`
  :host {
    width: 100%;
    height: 0.5em;
    display: inline-block;
    border-radius: 0.25em;
    background: var(--${cssGlobalVars.passive});
    color: var(--${cssGlobalVars.active});
  }

  [part="root"] {
    height: inherit;
    z-index: 1;
    position: relative;
    border-radius: inherit;
  }

  [part="value"] {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    transition: all 0.3s;
    animation: progress 1.5s ease-in-out infinite alternate;
    background: currentColor;
  }

  @keyframes progress {
    from {
      left: 0;
    }
    to {
      left: 80%;
    }
  }

  .static [part="value"] {
    animation: none;
  }
`)
export class Progress extends GodownElement {
  /**
   * Maximum.
   */
  @property({ type: Number }) max = 1;
  /**
   * Minimum.
   */
  @property({ type: Number }) min = 0;
  /**
   * Input value.
   */
  @property({ type: Number, reflect: true }) value = null;

  protected render() {
    let width = 20;
    let className: string;
    if (this.value !== null) {
      width = this.parsePercent(this.value);
      className = "static";
    }
    return html`<div part="root" class="${className}">
      <i part="value" style="width:${width}%;"></i>
    </div>`;
  }

  /**
   * Convert s to a percentage without a percent sign.
   *
   * @param s String or number to convert.
   * @returns Percentage without a percent sign.
   */
  parsePercent(s: string | number = "0"): number {
    if (String(s).includes("%")) {
      return parseFloat(String(s));
    }
    return (parseFloat(String(s)) / (this.max - this.min)) * 100;
  }
}

export default Progress;
