import type { Renderer, StoryAnnotations } from "@storybook/csf";
import type { TemplateResult } from "lit";

export type StoryMeta<T extends HTMLElement> = StoryAnnotations<Renderer, T>;

export type StoryVariants<T> = StoryAnnotations<
  Renderer & {
    component: string;
    storyResult: TemplateResult<1> | TemplateResult<1>[];
  },
  T
>;
