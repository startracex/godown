import Badge from "./component.js";

Badge.define();

export default Badge;

declare global {
  interface HTMLElementTagNameMap {
    "godown-badge": Badge;
  }
}
