import { IconButton } from "storybook/internal/components";
import { SideBySideIcon } from "@storybook/icons";
import { addons } from "storybook/internal/manager-api";
import { html } from "lit";
import { memo, useEffect, useState } from "react";
import { requestFresh } from "./fresh-styles";

export const comparisonDecorator = (storyFn, context) => {
  const displayCompare = context.viewMode === "story";
  if (!displayCompare) {
    return storyFn();
  }
  return html`
    <div id="compare-root">
      <div
        id="compare-source"
      >
        ${storyFn()}
      </div>
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
  const [compare, setCompare] = useState(localStorage.getItem("compare") === "false" ? false : true);
  const iframe = document.querySelector("iframe");

  const updateIframe = (compare: boolean) => {
    addons.setConfig({ compare });
    addons.getChannel().emit("compare-change", compare);
    requestFresh(iframe);
  };

  useEffect(() => {
    updateIframe(compare);
  }, []);

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
