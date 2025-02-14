"use client";
import Form from "godown/form.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicTag } from "./lib/intrinsic.js";

export default createReact(Form);

export * from "godown/form.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-form": IntrinsicTag<"godown-form">;
    }
  }
}
