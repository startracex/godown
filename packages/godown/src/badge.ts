import Badge from "./components/badge.js";

Badge.define();

export default Badge;

export * from "./components/badge.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-badge": Badge;
  }
}
