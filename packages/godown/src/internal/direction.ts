import { css, unsafeCSS, type CSSResult } from "lit";

const insetAlignSelector = unsafeCSS(`[direction-inset-align]`);

/**
 * Controls the inset alignment of the element relative to the direction.
 *
 * ```html
 * <div direction="${direction}">
 *   <div direction-inset-align></div>
 * </div>
 * ```
 */
export const directionInsetAlign: CSSResult = css`
  [direction^="top"] ${insetAlignSelector} {
    top: 0;
  }

  [direction^="bottom"] ${insetAlignSelector} {
    bottom: 0;
  }

  [direction$="right"] ${insetAlignSelector} {
    right: 0;
  }

  [direction$="left"] ${insetAlignSelector} {
    left: 0;
  }
`;

const outsetPlaceSelector = unsafeCSS(`[direction-outset-place]`);

/**
 * Controls the outset placement of the element relative to the direction.
 *
 * ```html
 * <div direction="${direction}">
 *   <div direction-outset-place></div>
 * </div>
 * ```
 */
export const directionOutsetPlace: CSSResult = css`
  [direction^="top"] ${outsetPlaceSelector} {
    bottom: 100%;
  }

  [direction^="bottom"] ${outsetPlaceSelector} {
    top: 100%;
  }

  [direction$="right"] ${outsetPlaceSelector} {
    left: 100%;
  }

  [direction$="left"] ${outsetPlaceSelector} {
    right: 100%;
  }
`;

export type DirectionCardinalX = "left" | "right";
export type DirectionCardinalY = "top" | "bottom";
export type DirectionCardinal = DirectionCardinalX | DirectionCardinalY;
export type DirectionCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type DirectionCenter = "center";
