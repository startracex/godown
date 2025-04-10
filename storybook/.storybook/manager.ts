import { addons, types } from "@storybook/manager-api";
import { DirectionSwitcher } from "./tools/direction-switcher";
import { FreshStyles } from "./tools/fresh-styles";
import { SourceLink } from "./tools/source-link";
import { ThemeSwitcher } from "./tools/theme-switcher";
import { themes } from "./themes";

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
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentDocument.documentElement.dataset.theme = theme;
      iframe.contentDocument.documentElement.style.colorScheme = theme;
    }
  };

  document.addEventListener("theme-change", handleChange);
  const wrapper = document.querySelector("#storybook-preview-wrapper");
  new MutationObserver(() => {
    const iframe = wrapper.querySelector("iframe");
    if (iframe) {
      iframe.contentDocument.documentElement.dataset.theme = document.documentElement.dataset.theme;
      iframe.contentDocument.documentElement.style.colorScheme = document.documentElement.dataset.theme;
    }
  }).observe(wrapper, {
    attributes: true,
    subtree: true,
  });
});
