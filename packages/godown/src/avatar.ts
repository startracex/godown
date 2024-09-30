import Avatar from "./components/avatar.js";

Avatar.define();

export default Avatar;

declare global {
  interface HTMLElementTagNameMap {
    "godown-avatar": Avatar;
  }
}
