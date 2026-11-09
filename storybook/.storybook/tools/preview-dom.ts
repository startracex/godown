export const getPreviewWrapper = (): HTMLElement | null => document.querySelector("#storybook-preview-wrapper");

export const getPreviewIframe = (): HTMLIFrameElement | null =>
  getPreviewWrapper()?.querySelector("iframe") ??
  document.querySelector<HTMLIFrameElement>("#storybook-preview-iframe");

export const getPreviewDocumentElement = (): HTMLElement | null =>
  getPreviewIframe()?.contentDocument?.documentElement ?? null;
