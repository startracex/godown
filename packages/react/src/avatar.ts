"use client";
import Avatar from "godown/avatar.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Avatar);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-avatar": IntrinsicElement<InstanceType<typeof Avatar>>;
    }
  }
}
