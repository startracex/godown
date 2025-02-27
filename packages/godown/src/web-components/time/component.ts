import { attr, godown, styles } from "@godown/element";
import fmtime from "fmtime";
import { type PropertyValues, type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../../internal/global-style.js";

const protoName = "time";

/**
 * {@linkcode Time} renders a formatting time.
 *
 * @fires time - Fires when the time changes.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    text-align: center;
  }
`)
class Time extends GlobalStyle {
  /**
   * Escape symbol.
   */
  @property()
  escape = "%";

  /**
   * Format strings.
   */
  @property()
  format = "YYYY-MM-DD hh:mm:ss";

  /**
   * Time.
   */
  @property({ type: Object })
  time: Date = new Date();

  /**
   * If there is a value, update every gap or timeout.
   */
  @property({ type: Number })
  timeout: number;

  /**
   * The number of milliseconds that change with each update.
   */
  @property({ type: Number })
  gap: number;

  protected timeoutId: number;

  protected render(): TemplateResult<1> {
    return html`
      <span
        part="root"
        ${attr(this.observedRecord)}
      >
        ${fmtime(this.format, this.time, this.escape)}
      </span>
    `;
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("timeout") && this.timeout) {
      this.timeouts.remove(this.timeoutId);
      this.timeoutId = this.timeouts.add(
        setInterval(() => {
          this.dispatchCustomEvent("time", this.time);
          this.time = new Date(this.time.getTime() + (this.gap || this.timeout));
        }, Math.abs(this.timeout)),
      );
    }
  }
}

export default Time;
export { Time };
