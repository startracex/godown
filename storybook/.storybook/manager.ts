import { addons, types } from "@storybook/manager-api";
import { themes } from "@storybook/theming";
import { repoLink } from "./tools/repolink";
import { changeDir } from "./tools/change-dir";
import { freshStyles } from "./tools/fresh-styles";

addons.setConfig({
  theme: themes.dark,
});

addons.register("addon-fresh", () => {
  addons.add("addon-fresh-styles", {
    type: types.TOOL,
    title: "fresh-style",
    render: freshStyles,
  });
});

addons.register("addon-dir", () => {
  addons.add("addon-dir-change", {
    type: types.TOOL,
    title: "change-dir",
    render: changeDir,
  });
});

addons.register("addon-link", () => {
  addons.add("addon-link-repo", {
    type: types.TOOLEXTRA,
    title: "repo-Link",
    render: repoLink,
  });
});
