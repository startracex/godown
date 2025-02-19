import { attr, godown, isNullable, Ranger, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars } from "../core/global-style.js";

const protoName = "progress";

/**
 * {@linkcode Progress} similar to `<progress>`.
 *
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    width: 100%;
    height: 0.5em;
    border-radius: 0.25em;
    background: var(${cssGlobalVars.passive});
    color: var(${cssGlobalVars.active});
  }

  :host,
  [part="root"] {
    display: block;
  }

  [part="root"] {
    z-index: 1;
    position: relative;
    border-radius: inherit;
    overflow: hidden;
  }

  [part="value"] {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    transition: all 0.3s;
    animation: progress 1.8s ease-in-out infinite alternate;
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
class Progress extends GlobalStyle {
  @property({ type: Number })
  max = 1;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  value: number;

  protected render(): TemplateResult<1> {
    let width = 20;
    let className: string;
    if (!isNullable(this.value)) {
      const ranger = new Ranger(this.min, this.max);
      width = ranger.restrict(this.value / ranger.diff) * 100;
      className = "static";
    }
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
        class="${className}"
      >
        <i
          part="value"
          style="width:${width}%;"
        ></i>
      </div>
    `;
  }
}

export default Progress;
export { Progress };
