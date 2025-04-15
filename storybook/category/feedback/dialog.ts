import { attr } from "@godown/element";
import type { Dialog } from "godown";
import { html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

export default (args: Dialog) => {
  const dialogRef = createRef<Dialog>();
  return html`
<godown-dialog ${attr(args)} ${ref(dialogRef)}>
  <godown-card footer>
    <p> 
      Like dialog, it listens for submit events and closes itself when the target method is "dialog".
    </p>
    <p>
      It listens for the keydown event and also closes itself when the "key" contained in the key is pressed.
    </p>
    <godown-flex slot="footer" content="end">
      <godown-button @click=${() => dialogRef.value.open = false}>
        Close
      </godown-button>
    </godown-flex>
  </godown-card>
</godown-dialog>

<godown-flex vertical gap="1em" style="height: 260px;">
  <godown-button @click=${() => {
      dialogRef.value.modal = false;
      dialogRef.value.toggle()
    }}>
    Open/Close no-modal dialog
  </godown-button>
  <godown-button @click=${() => dialogRef.value.showModal()}>
    Open modal dialog
  </godown-button>
</godown-flex>
`;
};
