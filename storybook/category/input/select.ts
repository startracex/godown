import { attr } from "@godown/element";
import type { Select } from "godown";
import { html } from "lit";

export default (args: Select) => {
  return html`
<godown-select ${
    attr({
      ...args,
      placeholder: args.placeholder || "Choose a food",
    })
  }>
  <godown-card style="margin-top: .2em;">
    <optgroup label="Fruit">
      <option value="apple">Apples</option>
      <option value="banana">Bananas</option>
      <option value="cherry">Cherries</option>
      <option value="damson">Damsons</option>
    </optgroup>
    <hr />
    <optgroup label="Vegetables">
      <option value="artichoke">Artichokes</option>
      <option value="broccoli">Broccoli</option>
      <option value="cabbage">Cabbages</option>
    </optgroup>
  </godown-card>
</godown-select>
  `;
};
