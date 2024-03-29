import { html, svg } from "lit";

export type HTMLTemplate = ReturnType<typeof html>;

/**
 * @param fill undefined: "currentColor". zero value: "none".
 * @param stroke undefined: "currentColor". zero value: "none".
 * @returns Function returns path needs d.
 */
export const path = (fill: string | void | number = "currentColor", stroke: string | void | number = "currentColor", strokeWidth: string | void | number = 3) => {
  fill = fill || "none";
  stroke = stroke || "none";
  return (d: string) => {
    return svg`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"></path>`;
  };
};

interface HtmlSlot {
  (): HTMLTemplate;
  (name: string): HTMLTemplate;
  <T>(name: string, feedback: T, node: ParentNode): T | HTMLTemplate;
}

export const htmlSlot = (<T>(name: string, fallback: T, node: ParentNode) => {
  if (name) {
    if (fallback && node && !node.querySelector(`[slot=${name}]`)) {
      return fallback;
    }
    return html`<slot name="${name}"></slot>`;
  }
  return html`<slot></slot>`;
}) as HtmlSlot;

export const htmlStyle = (css: string) => {
  if (css) {
    return html`<style>
      ${css}
    </style>`;
  }
};

// SVG ICONS.

export const svgDelta = () => {
  return html`<svg viewBox="0 0 48 48" fill="none">${path()("M36 19L24 31L12 19H36Z")}</svg>`;
};

export const svgDeltaSmooth = () => {
  return html`<svg viewBox="0 0 16 16" fill="currentColor">${path(undefined, 0)("m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z")}</svg>`;
};

export const svgArrow = (body?: boolean) => {
  const d = body ? "M24 12L36 24L24 36" : "M19 12L31 24L19 36";
  return html`<svg viewBox="0 0 48 48" fill="none">${body && path()("M36 24.0083H12")} ${path("none")(d)}</svg>`;
};

export const svgSearch = () => {
  return html`<svg viewBox="0 0 1024 1024">${path()("M745.429333 655.658667c1.173333 0.746667 2.325333 1.578667 3.413334 2.496l114.410666 96a32 32 0 0 1-41.152 49.024l-114.389333-96a32 32 0 0 1-6.208-6.976A297.429333 297.429333 0 0 1 512 768c-164.949333 0-298.666667-133.717333-298.666667-298.666667S347.050667 170.666667 512 170.666667s298.666667 133.717333 298.666667 298.666666a297.386667 297.386667 0 0 1-65.237334 186.325334zM512 704c129.6 0 234.666667-105.066667 234.666667-234.666667s-105.066667-234.666667-234.666667-234.666666-234.666667 105.066667-234.666667 234.666666 105.066667 234.666667 234.666667 234.666667z")}</svg>`;
};

export const svgEye = () => {
  return html`<svg viewBox="0 0 48 48">${path(0)("M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30")} ${path(0)("M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705")} ${path()("M42 42L6 6")}</svg>`;
};

export const svgX = () => {
  return html`<svg viewBox="0 0 48 48" fill="none">${path()("M14 14L34 34")} ${path()("M14 34L34 14")}</svg>`;
};

export const svgImage = () => {
  return html`<svg viewBox="0 0 1098 1024">${path(undefined, 0)("M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z")}</svg>`;
};

export const svgSun = () => {
  return html`<svg viewBox="0 0 16 16">${path(undefined, 0, 1)("M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z")}</svg>`;
};

export const svgMoon = (star?: boolean) => {
  return html`<svg viewBox="0 0 16 16">${path(undefined, 0)("M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z")} ${star && path(undefined, 0)("M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z")}</svg>`;
};

export const svgLink = () => {
  return html`<svg viewBox="0 0 48 48" fill="none">${path(0)("M28 6H42V20")}${path(0)("M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6")}${path()("M25.7998 22.1999L41.0998 6.8999")}</svg>`;
};

export const icons = {
  delta: svgDelta,
  "delta-smooth": svgDeltaSmooth,
  arrow: svgArrow,
  "arrow-body": () => svgArrow(true),
  search: svgSearch,
  eye: svgEye,
  x: svgX,
  image: svgImage,
  moon: svgMoon,
  "moon-star": () => svgMoon(true),
  sun: svgSun,
  link: svgLink,
};
