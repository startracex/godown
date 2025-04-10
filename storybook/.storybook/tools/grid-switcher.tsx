import { IconButton } from "@storybook/components";
import { GridIcon } from "@storybook/icons";
import React, { memo, useState } from "react";

export const GridSwitcher = memo(() => {
  const [grid, setGrid] = useState(!!localStorage.getItem("grid"));

  const iframe = document.querySelector("iframe");
  const toggleGrid = () => {
    setGrid(!grid);
    const s = `${!grid}`;
    iframe.contentDocument.documentElement.dataset.grid = s;
    localStorage.setItem("grid", s);
  };

  return (
    <IconButton
      key="Grid"
      active={grid}
      onClick={toggleGrid}
      title="Display background grid"
    >
      <GridIcon />
    </IconButton>
  );
});
