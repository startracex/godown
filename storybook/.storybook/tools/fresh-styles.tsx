import { IconButton } from "storybook/internal/components";
import { ReduxIcon } from "@storybook/icons";
import React, { memo } from "react";
import { getPreviewIframe } from "./preview-dom.ts";

export const requestFresh = (e: HTMLElement | null | undefined) => {
  if (!e) {
    return;
  }
  e.style.display = "none";
  requestAnimationFrame(() => {
    e.style.display = "";
  });
};

export const FreshStyles = memo(() => {
  const requestFrame = () => {
    requestFresh(getPreviewIframe());
  };

  return (
    <IconButton
      title="Fresh styles"
      onClick={requestFrame}
    >
      <ReduxIcon />
    </IconButton>
  );
});
