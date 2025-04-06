import { IconButton } from "@storybook/components";
import { ParagraphIcon } from "@storybook/icons";
import { useGlobals } from "@storybook/manager-api";
import React, { memo } from "react";

export const DirectionSwitcher = memo(() => {
  const [{ dir }, updateGlobals] = useGlobals();

  const nextDir = dir === "rtl" ? "ltr" : "rtl";
  return (
    <IconButton
      onClick={() => updateGlobals({ dir: nextDir })}
      title="Change direction"
    >
      <ParagraphIcon />
    </IconButton>
  );
});
