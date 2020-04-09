<h1 align="center">NetlifyCMS Custom Widgets</h1>

<p align="center">A collection of custom widgets for <a href="https://www.netlifycms.org/">netlify-cms</a></p>

---

<p align="center">⚠ Unstable: Under active development</p>

---

## What's inside

npm package | description | docs
---|---|---
@ncwidgets/id | Generate an unique ID for new entries in a folder collection | 
@ncwidgets/file-relation | Dropdown select widget for a field inside a file collection (the default relation widget only works for folder collections) | [docs](packages/widget-file-relation/readme.md)
@ncwidgets/reorder | Drag & drop to order entries in a folder collection | [docs](packages/widget-reorder/readme.md)
@ncwidgets/netlify-cms | Custom netlify-cms build with file-relation & id built in | see [here](#drop-in)


## How to use

```js
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'

cms.registerWidget(IdWidget)
cms.registerWidget(ReorderWidget)
cms.registerWidget(FileRelationWidget)

cms.init()
```

### Drop-in

`@ncwidgets/netlify-cms` is a drop-in replacement for `netlify-cms`, but includes file-relation & id widget.

```diff
- <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
+ <script src="https://unpkg.com/@ncwidgets/netlify-cms@^0.7.0/dist/netlify-cms.js"></script>
```

### With Gatsby
[TBH]

### With Hugo
[TBH]

## Contribute

Has an idea for a widget? Please feel free to send over a PR, or open an issue with the `idea` tag.

### Build
This is a monorepo with yarn workspace & lerna.

```bash
# Setup
yarn
yarn bootstrap

# Launch the playground with 
# all the custom widgets at localhost:
yarn playground:dev

# Build widgets
yarn build
```