import type { Popover } from "godown";
import { html } from "lit";
import { ArgHelper } from "../../lib/args";
import { gridPositions } from "../../lib/grid-positions";
import type { StoryMeta, StoryVariants } from "../../lib/types";
import { attr } from "@godown/element";

export default {
  title: "display/Popover",
  component: "godown-popover",
  tags: ["autodocs"],
  argTypes: {
    open: new ArgHelper().type("boolean").default("false").arg,
    action: new ArgHelper().options(["show", "hide", "toggle", "none"], "bottom").arg,
    position: new ArgHelper().options(
      [
        "center",
        "left",
        "left-top",
        "left-bottom",
        "right",
        "right-top",
        "right-bottom",
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "start",
        "start-start",
        "start-end",
        "end",
        "end-start",
        "end-end",
      ],
      "bottom",
    ).arg,
    span: new ArgHelper().options(["span", "spread", "isolated"], "span").arg,
  },
  args: {
    open: false,
    action: "show",
    position: "bottom",
    span: "span",
  },
} as StoryMeta<Popover>;

type Story = StoryVariants<Popover>;

export const Primary: Story = {
  render: (args: Popover) =>
    html`
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
  `,
};

export const Positions: Story = {
  render: (args: Popover) =>
    html`
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
  `,
};
