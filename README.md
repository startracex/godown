# godown

Atomic Web Component Library.

[![Storybook documentation](https://raw.githubusercontent.com/storybookjs/brand/main/badge/badge-storybook.svg)](https://godown.js.org)
[![NPM Version](https://img.shields.io/npm/v/godown)](https://www.npmjs.com/package/godown)
[![NPM Downloads](https://img.shields.io/npm/dm/godown)](https://www.npmjs.com/package/godown)
[![License MIT](https://img.shields.io/badge/license%20MIT-black)](https://github.com/startracex/godown/blob/main/LICENSE)

## Features

- 🌙 Follow color schemes: Use "color-scheme" to switch between light/dark themes.
- 🎨 Highly customizable: Easily customize styles through CSS variables and the part pseudo-selector.
- 🌉 Framework agnostic: Suitable for any UI framework or vanilla JavaScript via web components.
- 💫 Atomic components: Each component is self-contained, without introducing other component definitions or requiring use with other components.

## Development

Install dependencies.

```sh
node prepare.cjs && pnpm i
```

Start development server.

```sh
pnpm run dev
```

Format.

```sh
pnpm run fmt
pnpm run fmt:check
```

Lint.

```sh
pnpm run lint
pnpm run lint:check
```

Build packages.

```sh
pnpm run build
```
