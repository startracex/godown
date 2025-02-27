import Avatar from "./component.js";

Avatar.define();

export default Avatar;

declare global {
  interface HTMLElementTagNameMap {
    "godown-avatar": Avatar;
  }
}
