import { useStorybookState } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";
import { GithubIcon } from "@storybook/icons";
import React, { memo } from "react";

export const repoLink = memo(() => {
  const { storyId } = useStorybookState();
  let href = "https://github.com/startracex/godown/blob/next";
  if (storyId) {
    const [category, name] = storyId.split("-");
    href += `/storybook/category/${category}/${name}.stories.ts`;
  }

  return (
    <a style={{ display: "contents" }} href={href}>
      <IconButton title="Open in GitHub">
        <GithubIcon />
      </IconButton>
    </a>
  );
});
