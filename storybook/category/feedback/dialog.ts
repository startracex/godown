import { attr } from "@godown/element";
import type { Dialog } from "godown";
import { html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

export default (args: Dialog) => {
  const dialogRef = createRef<Dialog>();
  return html`
<godown-dialog ${attr(args)} ${ref(dialogRef)}>
  <godown-button slot="trigger">
    open dialog
  </godown-button>
  <godown-card footer>
    <p> 
      Like dialog, it listens for submit events and closes itself when the target method is "dialog".
      Dialog requires using slot="trigger" as the trigger instead of an element without a slot name
    </p>
    <godown-flex slot="footer" content="end">
      <godown-button @click=${() => dialogRef.value.close()}>
        Close
      </godown-button>
    </godown-flex>
  </godown-card>
</godown-dialog>
`;
};
