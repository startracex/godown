import { attr } from "@godown/element";
import type { Popover } from "godown";
import { html } from "lit";
import { gridPositions } from "../../grid-positions";

export default (args: Popover) => {
  return html`
<godown-grid style="place-content: center;">

  <godown-popover ${attr(args)}>
    <godown-button>
    ${args.action === "none" ? "action is none" : `${args.action} popover`}
    </godown-button>

    <godown-card
      slot="popover"
      style="width: 300px;"
    >
      Like details, the expanded popover will have the open attribute.
    </godown-card>
  </godown-popover>

</godown-grid>
  `;
};

export const allPositions = (args: Popover) => {
  return html`
<godown-grid
  rows="repeat(5, 2.5em)"
  columns="repeat(5, 2.5em)"
  content="center"
  items="center"
  style="margin: 2em;"
>
${
    gridPositions.map((i) => {
      const { position, row, icon, column } = i;
      return html`
    <godown-popover
      position="${position as Popover["position"]}"
      action="${args.action}"
      span="${args.span}"
      style="grid-row: ${row}; grid-column: ${column};"
    >
      <godown-button
        style="width: 2em;height: 2em;"
      >
        <iconify-icon
          icon="${icon}"
          style="font-size: 1.25em;transform: rotate(${i.rotate || 0}deg);"
        ></iconify-icon>
      </godown-button>
      <godown-card slot="popover">${position}</godown-card>
    </godown-popover>
        `;
    })
  }
</godown-grid>
  `;
};
