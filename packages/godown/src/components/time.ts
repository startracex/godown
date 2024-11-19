import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import fmtime from "fmtime";
import { css, type PropertyValues } from "lit";
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
  time = new Date();

  /**
   * If there is a value, update every gap or timeout.
   */
  @property({ type: Number })
  timeout;

  /**
   * The number of milliseconds that change with each update.
   */
  @property({ type: Number })
  gap;

  protected timeoutId: number;

  protected render(): string {
    return fmtime(this.format, this.time, this.escape);
  }

  protected firstUpdated() {
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

  disconnectedCallback() {
    clearInterval(this.timeoutId);
  }

  startTimeout() {
    return window.setInterval(() => {
      this.time = new Date(this.time.getTime() + (this.gap || this.timeout));
    }, Math.abs(this.timeout));
  }
}

export default Time;
