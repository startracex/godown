"use client";
import component from "godown/avatar.js";

import create from "./lib/create.js";
import { type IntrinsicTag } from "./lib/intrinsic.js";

export default create(component);

export * from "godown/avatar.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-avatar": IntrinsicTag<"godown-avatar">;
    }
  }
}
