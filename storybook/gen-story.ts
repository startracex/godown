import { existsSync, writeFileSync } from "fs";
import { join } from "path/posix";

type CategoryType =
  | "display"
  | "feedback"
  | "input"
  | "layout"
  | "effect"
  | "navigation";

const camel = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const formatStories = (category: CategoryType, name: string) => {
  return `import { RendererMeta } from "../../types";
import render from "./${name}";

export default {
  title: "${category}/${camel(name)}",
  component: "godown-${name}",
  tags: ["autodocs"],
  render,
  argTypes: {
  },
  args: {
  },
} as RendererMeta<typeof render>;

export const Primary = {};
`;
};

const formatRender = (name: string) => {
  return `import "godown/${name}.js";

import { attr } from "@godown/element/directives/attr";
import { html } from "lit";

import { Godown } from "../../types";

export default (args: Godown.${camel(name)}) => {
  return html\`
<godown-${name} \${attr(args)}></godown-${name}>
  \`;
};`;
};

export const genStory = (
  category: CategoryType,
  name: string,
) => {
  const fileName = join(import.meta.dirname, "category", category, name);
  const stories = fileName + ".stories.ts";
  const render = fileName + ".ts";
  if (!existsSync(stories)) {
    writeFileSync(stories, formatStories(category, name));
  }
  if (!existsSync(render)) {
    writeFileSync(render, formatRender(name));
  }
};
