import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { attr } from "@godown/element/directives/attr.js";
import fmtime from "fmtime";
import { css, html, type PropertyValues, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "time";

/**
 * {@linkcode Time} renders a formatting time.
 *
 * @category display
 */
@godown(protoName)
@styles(css`:host{text-align: center;}`)
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
  format = "YYYY-MM-DD hh:mm:ss UTFZ";

  /**
   * Time.
   */
  @property({ type: Object })
  time: Date = new Date();

  /**
   * If there is a value, update every gap or timeout.
   */
  @property({ type: Number })
  timeout: any;

  /**
   * The number of milliseconds that change with each update.
   */
  @property({ type: Number })
  gap: any;

  protected timeoutId: number;

  protected render(): TemplateResult<1> {
    return html`<span part="root" ${attr(this.observedRecord)}>
      ${fmtime(this.format, this.time, this.escape)}
    </span>`;
  }

  protected firstUpdated(): void {
    if (this.timeout) {
      this.timeoutId = this.startTimeout();
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("timeout")) {
      clearInterval(this.timeoutId);
      if (this.timeout) {
        this.timeoutId = this.startTimeout();
      }
    }
  }

  disconnectedCallback(): void {
    clearInterval(this.timeoutId);
  }

  startTimeout(): number {
    return window.setInterval(() => {
      this.time = new Date(this.time.getTime() + (this.gap || this.timeout));
    }, Math.abs(this.timeout));
  }
}

export default Time;
