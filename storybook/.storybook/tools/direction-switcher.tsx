import { IconButton } from "storybook/internal/components";
import { ParagraphIcon } from "@storybook/icons";
import { addons } from "storybook/manager-api";
import React, { memo, useEffect, useState } from "react";
import { getPreviewDocumentElement } from "./preview-dom.ts";

export type TextDirection = "ltr" | "rtl";

const DIR_STORAGE_KEY = "dir";

export const readStoredDir = (): TextDirection => (localStorage.getItem(DIR_STORAGE_KEY) === "rtl" ? "rtl" : "ltr");

export const applyDirection = (dir: TextDirection) => {
  document.documentElement.dir = dir;
  const previewRoot = getPreviewDocumentElement();
  if (previewRoot) {
    previewRoot.dir = dir;
  }
  addons.setConfig({ dir });
  addons.getChannel().emit("dir-change", dir);
};

export const DirectionSwitcher = memo(() => {
  const [dir, setDir] = useState<TextDirection>(readStoredDir);
  const nextDir: TextDirection = dir === "ltr" ? "rtl" : "ltr";

  useEffect(() => {
    applyDirection(dir);
  }, [dir]);

  const toggleDir = () => {
    setDir(nextDir);
    localStorage.setItem(DIR_STORAGE_KEY, nextDir);
  };

  return (
    <IconButton
      onClick={toggleDir}
      title={`Change direction (now ${dir.toUpperCase()})`}
      active={dir === "rtl"}
    >
      <ParagraphIcon />
    </IconButton>
  );
});
