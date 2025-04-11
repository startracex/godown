import { IconButton } from "@storybook/components";
import { GithubIcon } from "@storybook/icons";
import { useStorybookState } from "@storybook/manager-api";
import React, { memo } from "react";

export const SourceLink = memo(() => {
  const { storyId, index } = useStorybookState();
  let href = "https://github.com/startracex/godown/blob/next";

  const path = (index?.[storyId] as any)?.importPath?.slice(1);
  if (path) {
    href += "/storybook" + path;
    return (
      <IconButton asChild>
        <a
          href={href}
          title="Open in GitHub"
        >
          <GithubIcon />
        </a>
      </IconButton>
    );
  }

  return null;
});
