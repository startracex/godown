# godown

The Web Components Library.

## Install

```sh
npm i godown
```

## Import

Import one component.

```js
import Alert from "godown/alert.js";
```

Import all components.

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

```jsx
import Alert from "@godown/react/alert";

export default function () {
  return <Alert title="Alert" />;
}
```

### CSS variable

Element-scoped css variables will start with `--${tagName}--`.

```html
<godown-button style="--godown-button--focus-scale: .95;"></godown-button>
```

### Undefined

Undefined elements at `/web-components/${name}/component.js`.

```ts
import Button "godown/web-components/button/component.js";

customElements.define("my-button", Button);
```

```html
<my-button>Click me</my-button>
```
