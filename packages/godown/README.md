# godown

`Non Composite` Web Components Library.

## Install

```sh
npm i godown
```

## Import

Import all components.

```js
import Alert from "godown/alert.js";
```

Import one component.

```js
import { Alert } from "godown";
```

## Usage

### HTML

```html
<godown-alert title="Alert"></godown-alert>
```

### JS

```js
import { Alert } from "godown";

const alert = new Alert();
alert.title = "Alert";

document.body.appendChild(alert);
```

### React

React components is now in the standalone package (@godown/react).

This package only provides empty conversion.

```jsx
import { Alert } from "@godown/react";

export default function () {
  return <Alert title="Alert" />;
}
```

## Tips

### Initial properties

The constructor parameter can accept an initial value record and assign it after **connected** to document.

Element will override the records of the superclass.

`GodownElement` (require @godown/element) will work for all elements.

```js
import GodownElement from "@godown/element";

GodownElement.godownConfig ||= new GodownConfig();
GodownElement.godownConfig.assign = {
  classList: ["godown-element", "custom-element"],
};

import Input from "godown/input.js";
new Input({ id: "my-input" });
```

```html
<godown-input id="my-input" class="godown-element custom-element"></godown-input>
```

#### With CSS

This is useful when customizing styles.

```css
.godown-element {
  --godown--background: rgb(0 0 0);
  font-size: 20px;
}
```

### Tag naming

Modify the element prefix and suffix,
the tag name will be joined with `-`.

```js
GodownElement.godownConfig.prefix = "g";
GodownElement.godownConfig.suffix = "";
```

Modify the tag method to return the element name directly.

```js
GodownElement.godownConfig.tag = function (origin) {
  return this.prefix + "-" + origin;
};
```

```html
<g-button></g-button>
```

### CSS variable prefix

Element-scoped css variables will start with `--${tagName}--`.

```html
<godown-button style="--godown-button--focus-scale: .95;"></godown-button>
```

### Undefined

Undefined elements in the `./components` sub path.

```ts
import Button "godown/components/button.js";

customElements.define("my-button", Button);
```

```html
<my-button>Click me</my-button>
```

### Conditional import

Under "development" condition, the template will not be compressed.
