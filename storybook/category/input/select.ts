import { attr } from "@godown/element";
import type { Select } from "godown";
import { html } from "lit";

export default (args: Select) => {
  return html`
<godown-select ${attr(args)} style="margin-${args.direction || "bottom"}: 8em;">

  ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
    ].map((value, index) =>
      html`<option value="${index + 1}">${value}</option>
  `
    )
  }
</godown-select>
  `;
};
