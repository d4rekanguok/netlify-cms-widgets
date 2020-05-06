<h1 align="center">ID Widget for NetlifyCMS</h1>

<p align="center">A widget for <a href="https://www.netlifycms.org/" target="_blank">netlify-cms</a> to generate ID for items in a list, or entries of a folder collection.</p>

---

<p align="center">⚠ Unstable: Under active development</p>

## Installation
```
npm i @ncwidgets/id
```

---

## Demo

In the demo below, the `categories` field is loaded from a file collection.

<a href="https://custom-widgets.netlify.com/#/collections/posts/entries/hej" target="_blank">Live demo</a>

### Register
```js
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'

cms.registerWidget(IdWidget)

cms.init()
```

## How to use
### Example config

```yml
collections:
  - label: Posts
    label_singular: Post
    name: posts
    folder: _posts
    create: true
    fields:
      - label: ID
        name: id

        # Default widget name
        widget: ncw-id
        
        # <Optional> If specified, add a prefix, i.e post-dnfuHvOhP
        prefix: post

        # <Optional> If `true`, add timestamp, i.e post-1588747959991-dnfuHvOhP
        # This can be used to sort collection by creation time
        timestamp: false

        # <Optional> Hide the widget from UI
        # Beware: We literally add `display: none` to the DOM node wrapping the input. It will break if netlifyCMS's editor pane structure changes.
        hidden: false
```

## Contribute

Found a bug or a missing feature? Please feel free to send over a PR, or open an issue with the `bug` or `enhancement` tag.
