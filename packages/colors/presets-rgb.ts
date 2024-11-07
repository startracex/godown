const rgb = (r: number, g: number, b: number) => (
  {
    r,
    g,
    b,
    toString() {
      return `${this.r} ${this.g} ${this.b}`;
    },
  }
);

export type Gradients<T> = [T, T, T, T, T, T, T, T, T, T];

type PresetsValues = Gradients<ReturnType<typeof rgb>>;

const darkgray: PresetsValues = [
  rgb(121, 121, 121),
  rgb(109, 109, 109),
  rgb(97, 97, 97),
  rgb(85, 85, 85),
  rgb(73, 73, 73),
  rgb(61, 61, 61),
  rgb(48, 48, 48),
  rgb(36, 36, 36),
  rgb(24, 24, 24),
  rgb(12, 12, 12),
];

const lightgray: PresetsValues = [
  rgb(243, 243, 243),
  rgb(231, 231, 231),
  rgb(219, 219, 219),
  rgb(206, 206, 206),
  rgb(194, 194, 194),
  rgb(182, 182, 182),
  rgb(170, 170, 170),
  rgb(158, 158, 158),
  rgb(146, 146, 146),
  rgb(133, 133, 133),
];

const teal: PresetsValues = [
  rgb(213, 249, 248),
  rgb(170, 243, 241),
  rgb(128, 237, 234),
  rgb(85, 231, 226),
  rgb(43, 225, 219),
  rgb(0, 219, 212),
  rgb(0, 175, 170),
  rgb(0, 131, 127),
  rgb(0, 88, 85),
  rgb(0, 44, 42),
];

const blue: PresetsValues = [
  rgb(213, 240, 255),
  rgb(170, 224, 255),
  rgb(128, 209, 255),
  rgb(85, 193, 255),
  rgb(43, 178, 255),
  rgb(0, 162, 255),
  rgb(0, 130, 204),
  rgb(0, 97, 153),
  rgb(0, 65, 102),
  rgb(0, 32, 51),
];

const green: PresetsValues = [
  rgb(221, 243, 221),
  rgb(186, 231, 186),
  rgb(152, 219, 152),
  rgb(117, 206, 117),
  rgb(82, 194, 82),
  rgb(48, 182, 48),
  rgb(38, 146, 38),
  rgb(29, 109, 29),
  rgb(19, 73, 19),
  rgb(10, 36, 10),
];

const red: PresetsValues = [
  rgb(251, 221, 221),
  rgb(247, 186, 187),
  rgb(243, 152, 154),
  rgb(239, 118, 120),
  rgb(235, 83, 86),
  rgb(231, 49, 52),
  rgb(185, 39, 42),
  rgb(139, 29, 31),
  rgb(92, 20, 21),
  rgb(46, 10, 10),
];

const purple: PresetsValues = [
  rgb(242, 228, 253),
  rgb(229, 201, 250),
  rgb(217, 174, 248),
  rgb(204, 146, 245),
  rgb(191, 119, 243),
  rgb(178, 92, 240),
  rgb(142, 74, 192),
  rgb(107, 55, 144),
  rgb(71, 37, 96),
  rgb(36, 18, 48),
];

const orange: PresetsValues = [
  rgb(255, 235, 213),
  rgb(255, 216, 170),
  rgb(255, 196, 128),
  rgb(255, 176, 85),
  rgb(255, 157, 43),
  rgb(255, 137, 0),
  rgb(204, 110, 0),
  rgb(153, 82, 0),
  rgb(102, 55, 0),
  rgb(51, 27, 0),
];

const yellow: PresetsValues = [
  rgb(251, 252, 216),
  rgb(247, 248, 177),
  rgb(243, 245, 138),
  rgb(239, 242, 98),
  rgb(235, 238, 59),
  rgb(231, 235, 20),
  rgb(185, 188, 16),
  rgb(139, 141, 12),
  rgb(92, 94, 8),
  rgb(46, 47, 4),
];

const pink: PresetsValues = [
  rgb(254, 222, 233),
  rgb(253, 189, 211),
  rgb(252, 156, 190),
  rgb(251, 123, 168),
  rgb(250, 90, 146),
  rgb(249, 57, 124),
  rgb(199, 46, 99),
  rgb(149, 34, 74),
  rgb(100, 23, 50),
  rgb(50, 11, 25),
];

export const presetsRGB = {
  darkgray,
  lightgray,
  teal,
  blue,
  green,
  red,
  purple,
  orange,
  yellow,
  pink,
};

export { blue, darkgray, green, lightgray, orange, pink, purple, red, rgb, teal, yellow };
