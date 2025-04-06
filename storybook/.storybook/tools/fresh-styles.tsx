import { IconButton } from "@storybook/components";
import { ReduxIcon } from "@storybook/icons";
import React, { memo } from "react";

export const FreshStyles = memo(() => {
  const onClick = () => {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.style.display = "none";
      requestAnimationFrame(() => {
        iframe.style.display = "";
      });
    }
  };

  return (
    <IconButton title="Fresh styles" onClick={onClick}>
      <ReduxIcon />
    </IconButton>
  );
});
