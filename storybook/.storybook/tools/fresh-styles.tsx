import { IconButton } from "@storybook/components";
import { ReduxIcon } from "@storybook/icons";
import React, { memo } from "react";

export const freshStyles = memo(() => {

  const onClick = () => {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.style.display = "none";
      requestAnimationFrame(() => { iframe.style.display = ""; });
    }
  };

  return <IconButton title="Fresh iframe styles" onClick={onClick}>
    <ReduxIcon />
  </IconButton>;
});
