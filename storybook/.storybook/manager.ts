import { addons, types } from "@storybook/manager-api";
import { DirectionSwitcher } from "./tools/direction-switcher";
import { FreshStyles } from "./tools/fresh-styles";
import { SourceLink } from "./tools/source-link";
import { ThemeSwitcher } from "./tools/theme-switcher";
import { ThemeComparison } from "./tools/theme-comparison";
import { GridSwitcher } from "./tools/grid-switcher";
import "../styl/manager.css";

import "./tools/css-hint";

document.body.appendChild(
  document.createElement("css-hint")
)

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

  addons.getChannel().on("compare-change", (e) => {
    iframe.contentDocument.documentElement.dataset.compare = `${e}`;
  });

  addons.getChannel().on("grid-change", (e) => {
    iframe.contentDocument.documentElement.dataset.grid = `${e}`;
  });
  new MutationObserver(() => {
    const de = iframe.contentDocument.documentElement;
    if (de) {
      const { themeKey: theme, compare, grid } = addons.getConfig();
      de.dataset.theme = theme;
      de.dataset.compare = `${compare}`;
      de.dataset.grid = `${grid}`;
    }
  }).observe(wrapper, {
    attributes: true,
    subtree: true,
  });
});
