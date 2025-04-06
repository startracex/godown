import { addons, types } from "@storybook/manager-api";
import { themes } from "@storybook/theming";
import { FreshStyles } from "./tools/fresh-styles";
import { SourceLink } from "./tools/source-link";
import { ThemeSwitcher } from "./tools/theme-switcher";

addons.setConfig({
  theme: themes.dark,
});

addons.register("startracex", () => {
  addons.add("fresh-styles", {
    type: types.TOOL,
    title: "Fresh Styles",
    render: FreshStyles,
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
});
