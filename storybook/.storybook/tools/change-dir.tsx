import { useGlobals } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";
import { ParagraphIcon } from "@storybook/icons";
import React, { memo, useCallback } from "react";

export const changeDir = memo(() => {
  const [globals, updateGlobals] = useGlobals();
  const key = "dir";
  const isRtl = globals[key] === "rtl";

  const changeDir = useCallback(() => {
    updateGlobals({
      [key]: isRtl ? "ltr" : "rtl",
    });
  }, [isRtl]);

  return <IconButton onClick={changeDir} title="Change direction">
    <ParagraphIcon />
  </IconButton>;
});
