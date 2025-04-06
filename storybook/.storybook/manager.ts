import { addons, types } from "@storybook/manager-api";
import { DirectionSwitcher } from "./tools/direction-switcher";
import { FreshStyles } from "./tools/fresh-styles";
import { SourceLink } from "./tools/source-link";
import { ThemeSwitcher } from "./tools/theme-switcher";
import { themes } from "@storybook/theming";

addons.register("startracex", (api) => {
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

  const handleChange = (e: CustomEvent) => {
    const theme = e.detail;
    api.setOptions({ theme: themes[theme] });
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  };

  document.addEventListener("theme-change", handleChange);
});
