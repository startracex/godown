import { addons, types } from "@storybook/manager-api";
import { DirectionSwitcher } from "./tools/direction-switcher";
import { FreshStyles } from "./tools/fresh-styles";
import { SourceLink } from "./tools/source-link";
import { ThemeSwitcher } from "./tools/theme-switcher";
import { ThemeComparison } from "./tools/theme-comparison";
import { GridSwitcher } from "./tools/grid-switcher";
import "../styl/manager.css";

import { CompatibilityHint } from "./tools/compatibility-hint";

document.body.appendChild(new CompatibilityHint());

addons.register("startracex", () => {
  addons.add("fresh-styles", {
    type: types.TOOL,
    title: "Fresh Styles",
    render: FreshStyles,
  });
  addons.add("direction-switcher", {
    type: types.TOOL,
    title: "Direction",
    render: DirectionSwitcher,
  });
  addons.add("grid-switcher", {
    type: types.TOOL,
    title: "Grid",
    render: GridSwitcher,
  });
  addons.add("theme-compare", {
    title: "Compare",
    type: types.TOOL,
    render: ThemeComparison,
    match: ({ viewMode }) => viewMode === "story",
  });
  addons.add("theme-switcher", {
    title: "Themes",
    type: types.TOOL,
    render: ThemeSwitcher,
  });
  addons.add("source-link", {
    type: types.TOOLEXTRA,
    title: "Repository",
    render: SourceLink,
  });

  const wrapper = document.querySelector("#storybook-preview-wrapper");
  const iframe = wrapper.querySelector("iframe");

  const getIframeDocument = () => iframe.contentDocument.documentElement;

  addons.getChannel().on("compare-change", (e) => {
    const doc = getIframeDocument();
    if (doc) {
      doc.dataset.compare = `${e}`;
    }
  });

  addons.getChannel().on("grid-change", (e) => {
    const doc = getIframeDocument();
    if (doc) {
      doc.dataset.grid = `${e}`;
    }
  });
  new MutationObserver(() => {
    const doc = getIframeDocument();
    if (doc) {
      const { themeKey: theme, compare, grid } = addons.getConfig();
      doc.dataset.theme = theme;
      doc.dataset.compare = `${compare}`;
      doc.dataset.grid = `${grid}`;
    }
  }).observe(wrapper, {
    attributes: true,
    subtree: true,
  });
});
