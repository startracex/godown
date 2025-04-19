import { css, type CSSResult } from "lit";

export const resetStyle: CSSResult = css`
  *,
  :host {
    box-sizing: border-box;
  }

  i {
    font-style: normal;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  span {
    white-space: nowrap;
  }

  svg {
    user-select: none;
  }

  input {
    border: 0;
    padding: 0;
    outline: 0;
    font-size: 100%;
    color: currentColor;
    background: none;
  }

  dl,
  dd {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  dialog {
    border: 0;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  [popover] {
    border: 0;
    margin: 0;
    padding: 0;
  }

  @supports not selector(:popover-open) {
    [popover] {
      display: none;
    }
  }
`;
