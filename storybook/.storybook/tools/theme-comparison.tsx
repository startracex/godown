import { IconButton } from "storybook/internal/components";
import { SideBySideIcon } from "@storybook/icons";
import { addons } from "storybook/manager-api";
import { html } from "lit";
import React, { memo, useEffect, useState } from "react";
import { requestFresh } from "./fresh-styles.js";
import { getPreviewIframe } from "./preview-dom.js";

export const comparisonDecorator = (storyFn, context) => {
  const displayCompare = context.viewMode === "story";
  if (!displayCompare) {
    return storyFn();
  }
  return html`
    <div id="compare-root">
      <div id="compare-source">${storyFn()}</div>
      <div
        id="compare-target"
        data-theme-reverse
      >
        ${storyFn()}
      </div>
    </div>
  `;
};

export const ThemeComparison = memo(() => {
  const [compare, setCompare] = useState(localStorage.getItem("compare") !== "false");

  const updateIframe = (nextCompare: boolean) => {
    addons.setConfig({ compare: nextCompare });
    addons.getChannel().emit("compare-change", nextCompare);
    requestFresh(getPreviewIframe());
  };

  useEffect(() => {
    updateIframe(compare);
  }, [compare]);

  const toggleCompare = () => {
    const newValue = !compare;
    setCompare(newValue);
    updateIframe(newValue);
    localStorage.setItem("compare", `${newValue}`);
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
