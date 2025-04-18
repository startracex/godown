import { attr } from "@godown/element";
import type { Tooltip } from "godown";
import { html } from "lit";
import { gridPositions } from "../../grid-positions";

export default (args: Tooltip) => {
  return html`
<godown-tooltip ${attr(args)}>
  <godown-button>Hover me</godown-button>
  <godown-card slot="tip" style="white-space: nowrap;">Tooltip content</godown-card>
</godown-tooltip>
  `;
};

export const allPositions = (args: Tooltip) => {
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
    <godown-tooltip
      position="${position as Tooltip["position"]}"
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
      <godown-card slot="tip">${position}</godown-card>
    </godown-tooltip>
        `;
    })
  }
</godown-grid>
  `;
};
