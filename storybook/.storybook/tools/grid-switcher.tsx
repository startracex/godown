import { IconButton } from "@storybook/components";
import { GridIcon } from "@storybook/icons";
import { addons } from "@storybook/manager-api";
import React, { memo, useState, useEffect } from "react";

export const GridSwitcher = memo(() => {
  const [grid, setGrid] = useState(localStorage.getItem("grid") === "true" ? true : false);

  const updateFrame = (grid: boolean) => {
    addons.setConfig({ grid });
    addons.getChannel().emit("grid-change", grid);
  };

  useEffect(() => {
    updateFrame(grid);
  }, []);

  const toggleGrid = () => {
    const newValue = !grid;
    setGrid(newValue);
    updateFrame(newValue);
    localStorage.setItem("grid", `${newValue}`);
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
