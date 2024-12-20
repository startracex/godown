# @godown/element

Component base class for godown.

## Usage

```js
import { GodownElement, component } from "@godown/element";

@component({
  tagName: "my-element",
  styles: [ /* ...styles */ ],
  autoDefine: true
})
class MyElement extents GodownElement {
}
```

```html
<my-element></my-element>
```

## With config.

```ts
import { GodownElement, GodownConfig, godown, styles } from "@godown/element";

@godown("element")
@styles(/* ...styles */)
class MyElement extents GodownElement {
  static godownConfig = new GodownConfig({
    prefix: "my",
  });
}

MyElement.define()
```
