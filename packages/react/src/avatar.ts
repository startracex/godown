"use client";
import component from "godown/avatar.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-avatar": IntrinsicTag<"godown-avatar">;
    }
  }
}
