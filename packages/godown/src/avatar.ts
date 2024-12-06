import Avatar from "./components/avatar.js";

Avatar.define();

export default Avatar;

export * from "./components/avatar.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-avatar": Avatar;
  }
}
