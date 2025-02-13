"use client";
import Avatar from "godown/avatar.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Avatar);

export * from "godown/avatar.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-avatar": IntrinsicTag<"godown-avatar">;
    }
  }
}
