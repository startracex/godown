import { IconButton } from "storybook/internal/components";
import { ParagraphIcon } from "@storybook/icons";
import { memo, useState } from "react";

export const DirectionSwitcher = memo(() => {
  const [dir, setDir] = useState("ltr");
  const nextDir = dir === "ltr" ? "rtl" : "ltr";

  const iframe = document.querySelector("iframe");
  const toggleDir = () => {
    document.documentElement.dir = nextDir;
    iframe.contentDocument.documentElement.dir = nextDir;
    setDir(nextDir);
  };

  return (
    <IconButton
      onClick={toggleDir}
      title="Change direction"
    >
      <ParagraphIcon />
    </IconButton>
  );
});
