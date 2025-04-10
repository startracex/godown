import { IconButton } from "@storybook/components";
import { SideBySideIcon } from "@storybook/icons";
import { html } from "lit";
import React, { memo, useState } from "react";

export const comparisonDecorator = (storyFn, context) => {
  const displayCompare = context.viewMode === "story";
  if (!displayCompare) {
    return storyFn();
  }
  return html`
    <div id="compare-root">
      <div
        id="compare-source"
        class="compare-block theme-obverse"
      >
        ${storyFn()}
      </div>
      <div
        id="compare-target"
        class="compare-block theme-reverse"
      >
        ${storyFn()}
      </div>
    </div>
  `;
};

export const ThemeComparison = memo(() => {
  const [compare, setCompare] = useState(localStorage.getItem("compare") === "false" ? false : true);

  const iframe = document.querySelector("iframe");
  const toggleCompare = () => {
    setCompare(!compare);
    const s = `${!compare}`;
    iframe.contentDocument.documentElement.dataset.compare = s;
    localStorage.setItem("compare", s);
  };

  return (
    <IconButton
      key="Compare"
      active={compare}
      onClick={toggleCompare}
      title="Display comparison"
    >
      <SideBySideIcon />
    </IconButton>
  );
});
