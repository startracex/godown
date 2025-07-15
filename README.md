# godown

Web Components Library.

<a href="https://godown.js.org" target="_blank"><img src="https://raw.githubusercontent.com/storybookjs/brand/main/badge/badge-storybook.svg" alt="Components documentation"></a>

## Features

- 🌙 Dark mode first
- 🎨 High customization
- 📐 Similar standard

## Development

Install dependencies

```sh
node prepare.cjs && pnpm i
```

Start development server

```sh
pnpm run dev
```

Format

```sh
pnpm run fmt
```

Lint

```sh
pnpm run lint
```

Build packages

```sh
pnpm run build
```

## Packages

### CLI

- `@godown/cli` CLI for building package.

### Libraries

- `godown` Web components library.

- `@godown/element` Component base class for godown.

- `@godown/react` React components for godown.

- `sharekit` Shareable utility toolkit.

- `template-extractor` Extract strings templates in TypeScript source file.

- `minify-html-parts` Minify HTML parts in TypeScript source file.

### Plugins

- `cem-define` Enhance custom-element-manifest's custom-element-definition exports.

- `cem-fix-module` Fix custom-element-manifest's module paths.

- `rollup-plugin-template-replace` Rollup plugin with template-extractor.

- `rollup-plugin-minify-html-parts` Rollup plugin with minify-html-parts.
