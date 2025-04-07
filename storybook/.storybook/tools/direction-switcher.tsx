import { IconButton } from "@storybook/components";
import { ParagraphIcon } from "@storybook/icons";
import React, { memo, useState } from "react";

export const DirectionSwitcher = memo(() => {
  const [dir, setDir] = useState("ltr");
  const nextDir = dir === "ltr" ? "rtl" : "ltr";
  return (
    <IconButton
      onClick={() => {
        document.documentElement.dir = nextDir;
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.contentDocument.documentElement.dir = nextDir;
        }
        setDir(nextDir);
      }}
      title="Change direction"
    >
      <ParagraphIcon />
    </IconButton>
  );
});
