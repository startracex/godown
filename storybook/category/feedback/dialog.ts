import "godown/dialog.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

import { Godown } from "../../types";

export default (args: Pick<Godown.Dialog, "open">) => {
  const dialogRef = createRef<HTMLElement & { open: boolean; }>();
  return html`
  <div style="height:200px">
  <button @click=${() => dialogRef.value.open = !dialogRef.value.open}>
     Open/Close dialog
  </button>
  <godown-dialog ${attr(args)} ${ref(dialogRef)}>
    <form method="dialog">
      <button>
        Submit form
      </button>
    </form>
    <button @click=${() => dialogRef.value.open = false}>
      Close
    </button>
  </godown-dialog>
</div>
`;
};
