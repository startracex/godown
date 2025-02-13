# @godown/react

```sh
npm i @godown/react
```

This package provides default conversion for React.

## Usage

JSX element

```jsx
import Alert from "@godown/react/alert";

export default function () {
  return <Alert title="Alert" />;
}
```

Intrinsic element

```jsx
import "@godown/react/alert";

export default function () {
  return <godown-alert title="Alert" />;
}
```

Convert to React component

```js
import { createReact } from "@godown/react/lib/create";

import { MyElement } from "./my-element-definition.js";

MyElement.elementTagName = "my-element";

const MyElementReact = createReact(MyElement, eventMap<
{
  onMyEvent: CustomEvent<any>;
}
>({
  onMyEvent: "my-event",
}));
```
