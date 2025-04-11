import { IconButton } from "@storybook/components";
import { ReduxIcon } from "@storybook/icons";
import React, { memo } from "react";

export const requestFresh = (e: HTMLElement) => {
  e.style.display = "none";
  requestAnimationFrame(() => {
    e.style.display = "";
  });
};

export const FreshStyles = memo(() => {
  const iframe = document.querySelector("iframe");
  const requestFrame = () => {
    requestFresh(iframe);
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
