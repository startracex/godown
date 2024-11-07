import "godown/select.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Pick<Godown.Select, "direction" | "variant" | "multiple" | "disabled">) => {
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
