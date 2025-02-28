"use client";
import Form from "godown/form.js";

import { createReact } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(Form);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-form": IntrinsicElement<Form>;
    }
  }
}
