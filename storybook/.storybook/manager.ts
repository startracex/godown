import { addons, types } from "storybook/manager-api";
import { DirectionSwitcher } from "./tools/direction-switcher.tsx";
import { FreshStyles } from "./tools/fresh-styles.tsx";
import { SourceLink } from "./tools/source-link.tsx";
import { ThemeSwitcher } from "./tools/theme-switcher.tsx";
import { ThemeComparison } from "./tools/theme-comparison.tsx";
import { GridSwitcher } from "./tools/grid-switcher.tsx";
import { CompatibilityHint } from "./tools/compatibility-hint.ts";
import { applyDirection, readStoredDir } from "./tools/direction-switcher.tsx";
import { getPreviewDocumentElement, getPreviewWrapper } from "./tools/preview-dom.ts";

document.body.appendChild(new CompatibilityHint());
document.documentElement.dir = readStoredDir();

addons.register("startracex", () => {
  applyDirection(readStoredDir());

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

  const syncIframeDataset = () => {
    const doc = getPreviewDocumentElement();
    if (!doc) {
      return;
    }
    const { themeKey: theme, compare, grid, dir } = addons.getConfig();
    doc.dataset.theme = theme;
    doc.dataset.compare = `${compare}`;
    doc.dataset.grid = `${grid}`;
    doc.dir = dir === "rtl" ? "rtl" : "ltr";
  };

  addons.getChannel().on("compare-change", (e) => {
    const doc = getPreviewDocumentElement();
    if (doc) {
      doc.dataset.compare = `${e}`;
    }
  });

  addons.getChannel().on("grid-change", (e) => {
    const doc = getPreviewDocumentElement();
    if (doc) {
      doc.dataset.grid = `${e}`;
    }
  });

  addons.getChannel().on("dir-change", (e) => {
    const dir = e === "rtl" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    const doc = getPreviewDocumentElement();
    if (doc) {
      doc.dir = dir;
    }
  });

  const observePreview = (wrapper: Element) => {
    new MutationObserver(syncIframeDataset).observe(wrapper, {
      attributes: true,
      subtree: true,
    });
    syncIframeDataset();
  };

  const existingWrapper = getPreviewWrapper();
  if (existingWrapper) {
    observePreview(existingWrapper);
  } else {
    const ready = new MutationObserver(() => {
      const wrapper = getPreviewWrapper();
      if (!wrapper) {
        return;
      }
      ready.disconnect();
      observePreview(wrapper);
    });
    ready.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
});
