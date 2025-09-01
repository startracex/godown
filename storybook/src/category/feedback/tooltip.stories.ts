import { html } from "lit";
import { attr } from "@godown/element";
import { ArgHelper } from "../../lib/args.js";
import { gridPositions } from "../../lib/grid-positions.js";
import type { StoryMeta, StoryVariants } from "../../lib/types.js";
import type Tooltip from "godown/web-components/tooltip/component.js";

export default {
  title: "feedback/Tooltip",
  component: "godown-tooltip",
  tags: ["autodocs"],
  argTypes: {
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
    span: new ArgHelper().options(["span", "isolated"], "span").arg,
    delay: new ArgHelper().control("number").arg,
  },
  args: {
    position: "bottom",
    span: "span",
    delay: 300,
  },
} as StoryMeta<Tooltip>;

type Story = StoryVariants<Tooltip>;

export const Primary: Story = {
  render: (args: Tooltip) => {
    return html`
      <godown-tooltip ${attr(args)}>
        <godown-button>Hover me</godown-button>
        <godown-card
          slot="tip"
          style="white-space: nowrap;"
        >
          Tooltip content
        </godown-card>
      </godown-tooltip>
    `;
  },
};

export const Positions: Story = {
  render: (args: Tooltip) => {
    return html`
      <godown-grid
        rows="repeat(5, 2.5em)"
        columns="repeat(5, 2.5em)"
        content="center"
        items="center"
        style="margin: 2em;"
      >
        ${gridPositions.map((i) => {
          const { position, row, icon, column } = i;
          return html`
            <godown-tooltip
              position="${position as Tooltip["position"]}"
              action="${args.action}"
              span="${args.span}"
              style="grid-row: ${row}; grid-column: ${column};"
            >
              <godown-button style="width: 2em;height: 2em;">
                <iconify-icon
                  icon="${icon}"
                  style="font-size: 1.25em;transform: rotate(${i.rotate || 0}deg);"
                ></iconify-icon>
              </godown-button>
              <godown-card slot="tip">${position}</godown-card>
            </godown-tooltip>
          `;
        })}
      </godown-grid>
    `;
  },
};
