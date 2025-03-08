# godown

## 3.10.1

### Patch Changes

- 6f4af2d: optimize top level regexp
- Updated dependencies [7fe48e2]
- Updated dependencies [6f4af2d]
  - @godown/element@1.8.1
  - @godown/f7-icon@1.0.11

## 3.10.0

### Minor Changes

- 7691cfa: revert web-components sub directory

### Patch Changes

- Updated dependencies [ffed3ac]
- Updated dependencies [6ca1462]
  - @godown/element@1.8.0
  - @godown/f7-icon@1.0.10

## 3.9.0

### Minor Changes

- 2ae2e5f: add global border width and color variables
- 18fd6ae: update styling approach using StyleController

### Patch Changes

- 4a7bb93: trim text before selecting
- Updated dependencies [ed1531d]
- Updated dependencies [89ac334]
- Updated dependencies [249e1e4]
- Updated dependencies [23d9538]
- Updated dependencies [74a4aef]
- Updated dependencies [ce4d381]
  - @godown/element@1.7.0
  - @godown/f7-icon@1.0.9

## 3.8.3

### Patch Changes

- @godown/element@1.6.1
- @godown/f7-icon@1.0.8

## 3.8.2

### Patch Changes

- Updated dependencies [69e4645]
- Updated dependencies [0012c42]
- Updated dependencies [e9d3f8f]
  - @godown/element@1.6.0
  - @godown/f7-icon@1.0.7

## 3.8.1

### Patch Changes

- Updated dependencies [c7ccbba]
- Updated dependencies [d024e98]
  - @godown/element@1.5.0
  - @godown/f7-icon@1.0.6

## 3.8.0

### Minor Changes

- c20b9d6: remove deprecated offset methods from Dragbox
- 80170f1: update Dragbox event handler visibility
- 0a3de45: remove deprecated noHeader, noFooter property from Layout
- f63b855: reduce events dispatch in Range
- ba4b74e: remove deprecated round property from Switch
- 4226d1c: remove blur, focus event dispatch for Split

### Patch Changes

- 548d562: add missing change event listener

## 3.7.5

### Patch Changes

- 2a0676f: remove the dividers in Card, increase padding
- 809d41f: lighter clip-background gradient
- 266f523: fix Range.createKeydownEvent fails to set the latest value
- d393437: replace custom CSS variable with direct host padding for Details
- 172a951: optimize the event listeners of Dragbox
- c794219: use bounding rect for dynamic size calculations

## 3.7.4

### Patch Changes

- 1443f9e: prevent text wrapping in tab items
- 5c5ac8b: add null check for Tabs.tabs

## 3.7.3

### Patch Changes

- 0f60559: update Tabs.index when the index is not out of bounds
- 7d3fb63: handle empty tab content

## 3.7.2

### Patch Changes

- 773ece3: remove Button "content" part
- c037d94: extract the width and height of "root" part

## 3.7.1

### Patch Changes

- 1d7855d: fix tabs item indicator display error caused by z-index
- e047b42: reduce tabs item padding

## 3.7.0

### Minor Changes

- 390880a: add Tabs component

### Patch Changes

- Updated dependencies [205a0cd]
- Updated dependencies [50af665]
- Updated dependencies [f7e5004]
- Updated dependencies [2aa40ef]
  - @godown/element@1.4.0
  - @godown/f7-icon@1.0.5

## 3.6.1

### Patch Changes

- a7ee549: add "none" option to OutlineType
- 01872fa: prevent overflow in Details
- bd1941d: flex Layout by default

## 3.6.0

### Minor Changes

- fbe1320: extract border radius to global variable
- 90f820d: refactor Dialog with native dialog element
- 15e5b0e: remove Layout.noHeader, Layout.noFooter
- 4df2919: remove Dialog.direction property

### Patch Changes

- 1bca553: reduce Details styles
- a894702: remove margin auto, min-height for Divider
- 80051b6: reduce Avatar styles
- 0581050: add missing Details.float property

## 3.5.3

### Patch Changes

- fdea2b3: ensure Range.ranger is initialized before reading properties
- c5040b1: correct Button modal positioning calculation
- 7e3e15e: observe resize to reset the offset for Carousel

## 3.5.2

### Patch Changes

- 3d1ee1c: fix duplicate input event dispatch
- 06d900d: dispatch change events separately

## 3.5.1

### Patch Changes

- 5c7df1c: publish tsconfig.json
- 1e939a1: replace local var with global var for input space
- Updated dependencies [5c7df1c]
  - @godown/element@1.3.1
  - @godown/f7-icon@1.0.4

## 3.5.0

### Minor Changes

- 23dd58e: update the type of Switch.value to boolean and make "checked" an alias of "value"
- aec8f39: add generics to inputs classes

### Patch Changes

- a20efaf: brighter active and passive
- d5484d9: synchronize the outline styles when Split is in the active and focus
- 5eca159: set color of Divider style to passive
- 0b80e7e: set background of Avatar style to passive

## 3.4.0

### Minor Changes

- 28d66a0: add outlineType for input components
- 46075d1: apply the style update applicable to the outlineType
- 00dfb24: revert Dialog.direction property
- 7c907ce: remove Switch.round
- b0d7f64: rename Avatar.format to formatName
- 0b213ef: remove Card background
- 1baf104: remove global background and foreground variables
- 43a9ad9: add Button.plain
- 2ef9b92: change Breath.duration and Progress.value to number

### Patch Changes

- 5f7216a: fix incorrect Range handle position
- a4c55ea: fix missing types of Timeout.timeout and Timeout.gap
- Updated dependencies [4869824]
- Updated dependencies [305ad82]
- Updated dependencies [1ea680e]
  - @godown/element@1.3.0
  - @godown/f7-icon@1.0.3

## 3.3.0

### Minor Changes

- a46611a: remove Range.normalizeValue
- 7322cdb: update Alert styles, remove light variant
- ed296bd: allow Carousel to accept child elements of varying widths
- 2b47f24: remove Range.reverse

### Patch Changes

- Updated dependencies [3e03234]
- Updated dependencies [ef4f1a4]
- Updated dependencies [663be6e]
- Updated dependencies [ab00c2e]
- Updated dependencies [06c3357]
- Updated dependencies [ffbe5d9]
- Updated dependencies [abb61fa]
- Updated dependencies [b6838e1]
- Updated dependencies [ad144f3]
- Updated dependencies [2a5ebb8]
- Updated dependencies [f71dea0]
- Updated dependencies [3501d16]
- Updated dependencies [99e1e34]
  - @godown/element@1.2.0
  - @godown/f7-icon@1.0.2

## 3.2.0

### Minor Changes

- 51e996a: add getter "pathname" for SuperAnchor
- fb5c08c: enhance Link and Router

### Patch Changes

- e82fe04: prevent cache when no path matches
- 3b8b143: remove useless undefined assignment
- ff7fcb3: fix assigning value to getter
- Updated dependencies [123a68b]
  - @godown/element@1.1.0
  - @godown/f7-icon@1.0.1

## 3.1.0

### Minor Changes

- 77ba16f: update naming conventions and access modifiers
- 5fcf04f: remove timezone in Time.format template
- 18c01a1: rename Breath property "text" to "content"
- 94896de: remove Router.routeChangeCallback

### Patch Changes

- 17b6c1a: handle edge cases in Progress calculation
- 1fa843d: add missing exports

## 3.0.2

### Patch Changes

- 7c8917e: remove default value of deprecated property
- 9d05f0e: fix reading undefined properties when there is no matching path in Router
- 6b03805: the Dialog keydown listener only prevent default when matching the close key
- 8d4ef14: omit the value of html input in observedRecord

## 3.0.1

### Patch Changes

- bc9f59e: convert Router.params to getter
- 76a4535: Router.pathname defaults to location.pathname

## 3.0.0

### Major Changes

- 13804c2: updated components

### Minor Changes

- b784fc9: add badge component
- 362231c: add event dispatch
- 67268b6: field routing can accept render function
- 1a4540c: add heading component
- 7538ea8: basic support for contents
- d067545: add side property for heading
- 8904374: remove reassignment of GodownElement.godownConfig

### Patch Changes

- d14cb08: tooltip.propagation defaults to false
- 796104a: add missing release files
- 949c0a9: update render for split
- 9f3e8b1: update styles for switch
- c7b74e5: remove default tip background for tooltip
- 405a9d2: update styles for button
- 8953fc1: remove href if heading has no id
- 9b96bd3: boolean field defaults to false
- 047a8d2: fix target error of the event listener for select
- a1ce927: remove baseURL for router
- 65373bb: remove unused properties for typewriter
- f258a33: support multi character input for split
- 6ca93fc: add type property for tooltip
- 999e5d6: fix dialog event remove error
- baedbde: refactor RouteTree access modifiers and methods
- 85adb54: use fmtime instead of Time.fmt
- e17d9b2: call super in the focus and blur
- 4b8f146: card always display border
- 6f7d068: remove range.swap, fix range.toSorted
- aff58ec: fix styles, computeStyle for breath
- ef638ee: set user-select of badge to none
- 37045dd: fix ignoring null values when obtaining pattern
- f6766a6: remove typewriter font-family
- 7251d5f: fix text checking for select
- 12d8d10: add suppress property for link
- 2683a8b: pathname of router defaults to undefined
- 6acf567: update components styles
- b5acc29: update styles
- 89ccdd0: update alert
- 674cfbd: fix styles for range, split, switch
- 74b25d4: using padding instead of space placeholders in the inputs
- 34ecc65: fix badge offset to use percentage
- be33b22: add multi-handle control and keyboard support for range
- bf94fa2: listen popstate for router
- 539fd1f: fx tag name error in the declaration
- 43d9bb2: unify the styling models of alert and button
- a0db037: reset interval during switching in carousel
- a9137cf: Router.path should be undefined instead of null when there is a mismatch
- 5a6ffac: set title part dir of details to ltr
- 2d924be: update button render result part from "slot" to "content"
- 12c6a95: update styles of range
- 1af48c7: remove legacy properties
- c256594: time.timeout, time.gap defaults to undefined
- 2bfdaf9: rename text to content for button
- 4125ddb: alert color defaults to blue
- 0452da3: z-index of the handle of range will be in ascending order according to the operation sequence
- eb66e63: rename Breath.computeStyle to \_computeStyle
- Updated dependencies [aedcd0f]
  - @godown/element@1.0.0
  - @godown/colors@1.0.0
  - @godown/f7-icon@1.0.0

## 3.0.0-canary.18

### Minor Changes

- d067545: add side property for heading

### Patch Changes

- 8953fc1: remove href if heading has no id
- 65373bb: remove unused properties for typewriter
- ef638ee: set user-select of badge to none
- 34ecc65: fix badge offset to use percentage
- 5a6ffac: set title part dir of details to ltr

## 3.0.0-canary.17

### Minor Changes

- b784fc9: add badge component
- 1a4540c: add heading component

## 3.0.0-canary.16

### Minor Changes

- 362231c: add event dispatch
- 8904374: remove reassignment of GodownElement.godownConfig

## 3.0.0-canary.15

### Minor Changes

- 67268b6: field routing can accept render function

### Patch Changes

- a1ce927: remove baseURL for router
- 2683a8b: pathname of router defaults to undefined
- a9137cf: Router.path should be undefined instead of null when there is a mismatch
- eb66e63: rename Breath.computeStyle to \_computeStyle

## 3.0.0-canary.14

### Patch Changes

- 37045dd: fix ignoring null values when obtaining pattern
- 0452da3: z-index of the handle of range will be in ascending order according to the operation sequence

## 3.0.0-canary.13

### Patch Changes

- baedbde: refactor RouteTree access modifiers and methods

## 3.0.0-canary.12

### Patch Changes

- 9b96bd3: boolean field defaults to false
- 12d8d10: add suppress property for link
- 674cfbd: fix styles for range, split, switch
- 74b25d4: using padding instead of space placeholders in the inputs
- 539fd1f: fx tag name error in the declaration
- 12c6a95: update styles of range

## 3.0.0-canary.11

### Minor Changes

- 7538ea8: basic support for contents

### Patch Changes

- a0db037: reset interval during switching in carousel

## 3.0.0-canary.10

### Patch Changes

- d14cb08: tooltip.propagation defaults to false
- 2d924be: update button render result part from "slot" to "content"

## 3.0.0-canary.9

### Patch Changes

- 9f3e8b1: update styles for switch
- c7b74e5: remove default tip background for tooltip
- 405a9d2: update styles for button
- f258a33: support multi character input for split
- 6ca93fc: add type property for tooltip
- 4b8f146: card always display border
- 6f7d068: remove range.swap, fix range.toSorted
- f6766a6: remove typewriter font-family
- bf94fa2: listen popstate for router
- c256594: time.timeout, time.gap defaults to undefined
- 2bfdaf9: rename text to content for button

## 3.0.0-canary.8

### Patch Changes

- 949c0a9: update render for split
- aff58ec: fix styles, computeStyle for breath
- 6acf567: update components styles
- 1af48c7: remove legacy properties

## 3.0.0-canary.7

### Patch Changes

- 85adb54: use fmtime instead of Time.fmt
- 4125ddb: alert color defaults to blue

## 3.0.0-canary.6

### Patch Changes

- 43d9bb2: unify the styling models of alert and button

## 3.0.0-canary.5

### Patch Changes

- 999e5d6: fix dialog event remove error
- e17d9b2: call super in the focus and blur
- be33b22: add multi-handle control and keyboard support for range

## 3.0.0-canary.4

### Patch Changes

- 89ccdd0: update alert

## 3.0.0-canary.3

### Patch Changes

- 047a8d2: fix target error of the event listener for select
- b5acc29: update styles

## 3.0.0-canary.2

### Patch Changes

- 7251d5f: fix text checking for select

## 3.0.0-canary.1

### Patch Changes

- 796104a: add missing release files

## 3.0.0-canary.0

### Major Changes

- 13804c2: updated components
