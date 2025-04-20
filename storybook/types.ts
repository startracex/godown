import { Renderer, StoryAnnotations } from "@storybook/csf";
import type { Meta } from "@storybook/web-components";
import { TemplateResult } from "lit";

export type RendererMeta<T extends (...args: any) => any> = Meta<
  Parameters<T>[0]
>;

export type StoryMeta<T> = StoryAnnotations<Renderer, T>;

export type StoryVariants<T> = StoryAnnotations<
  Renderer & {
    component: string;
    storyResult: TemplateResult<1> | TemplateResult<1>[];
  },
  T
>;
