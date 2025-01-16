import { attr } from "@godown/element/directives/attr.js";
import type { Dialog } from "godown";
import { html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

export default (args: Pick<Dialog, "open">) => {
  const dialogRef = createRef<HTMLElement & { open: boolean }>();
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
