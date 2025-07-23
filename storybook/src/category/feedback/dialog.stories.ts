import { attr } from "@godown/element";
import type { Dialog } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";

export default {
  title: "feedback/Dialog",
  component: "godown-dialog",
  tags: ["autodocs"],
  argTypes: {
    open: new ArgHelper().type("boolean").default("false").arg,
    modal: new ArgHelper().type("boolean").default("false").arg,
    key: new ArgHelper().type("string").default("Escape").arg,
  },
  args: {
    modal: false,
    open: false,
  },
} as StoryMeta<Dialog>;

type Story = StoryVariants<Dialog>;

export const Primary: Story = {
  render: (args: Dialog) => {
    const dialogRef = createRef<Dialog>();
    return html`
      <godown-dialog
        style="margin-bottom: 5em;"
        ${attr(args)}
        ${ref(dialogRef)}
      >
        <godown-button slot="trigger">open dialog</godown-button>
        <godown-card footer>
          <div style="margin-bottom: 1em;">
            Like dialog, it listens for submit events and closes itself when the target method is "dialog".
          </div>
          <div>Dialog requires using slot="trigger" as the trigger instead of an element without a slot name.</div>
          <godown-flex
            slot="footer"
            content="end"
          >
            <godown-button @click=${() => dialogRef.value.close()}>Close</godown-button>
          </godown-flex>
        </godown-card>
      </godown-dialog>
    `;
  },
};
