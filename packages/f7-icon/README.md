# @godown/f7-icon

IconWrapper for [F7](https://framework7.io/icons/).

```sh
npm i @godown/f7-icon
```

## Usage

### HTML custom element

```js
import "@godown/f7-icon";
```

```html
<f7-icon name="airplane"></f7-icon>
```

### Template result of lit-html 

```js
import { html } from "lit"
import Airplane from "@godown/f7-icon/icons/airplane.js";

html`
  ${Airplane()}
  ${Airplane({ /* attributes */ })}
  <svg viewBox="${Airplane.viewBox}" width="1em" height="1em">
    ${Airplane.body}
  </svg>
`;
```

### Rollup virtual plugin

Moving static imports to virtual directory.

```js
import virtualIcon from "@godown/f7-icon/lib/rollup.js";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "esm"
    virtualDirname: "virtual",
  },
  plugins: [
    virtualIcon(),
  ],
};
```

### Icon size

Width and height defaults to 1em.

*font-size* or *width and height* can change the icon's size.

```html
<f7-icon name="airplane" style="font-size:2em;"></f7-icon>
<f7-icon name="airplane" style="width:2em;height:2em;"></f7-icon>
```

### Undefined element

```js
import IconElement from "@godown/f7-icon/element.js";
customElements.define("my-icon", IconElement)
```

```html
<my-icon name="airplane"></my-icon>
```

## Type hint

### Node 16 Resolution

package.json exports

### Triple-Slash Directives

```ts
/// <reference types="@godown/f7-icon/types/all.d.ts"/>
```

## Importing and loading

### Specify the URL

This component imports icons through *dynamic import*.

The target module needs to export a function by **default**.

`toURL` is defaults to `` (name) => `./icons/${name}.js` ``.

The base of the import URL defaults to the `import.meta.url` of the **element declaration file (./element.js)**.

```js
import F7Icon from "@godown/f7-icon";

const i = new F7Icon();
i.toURL = function (name: string) {
  return "specified URL or string";
};
```

Example CDNs.

If the icons are not **built jointly**, or use an icon library with a **different base** than component, this could be useful.

```js
i.toURL =
/* esm.sh */
(name) => `https://esm.sh/@godown/f7-icon/icons/${name}.js`;

/* jsDelivr */
// (name) => `https://esm.run/@godown/f7-icon/icons/${name}.js`;

/*  unpkg */ 
// (name) => `https://unpkg.com/@godown/f7-icon/icons/${name}.js?module`;
```

### Lazy loading

Disable lazy loading:

```html
<f7-icon icon="house" loading="eager"></f7-icon>
```
