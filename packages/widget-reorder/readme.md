<h1 align="center">NetlifyCMS Reorder Widget</h1>

<p align="center">A widget for <a href="https://www.netlifycms.org/" target="_blank">netlify-cms</a> to handle custom ordering of a referenced collection.</p>

---

<p align="center">⚠ Unstable: Under active development</p>

## Installation
```
npm i @ncwidgets/reorder
```

## Demo

<a href="https://custom-widgets.netlify.com/#/collections/pages/entries/home" target="_blank">Live demo</a>

## Example use 
* Order items in a grid from another collection (using custom reorder-component). <br>
<img src="https://ucarecdn.com/d8d76bff-586c-4872-9363-aaa3d3183375/test.gif" width=50%>
* Setup a custom order for any collection.

## How to use
### Example config
Assuming that posts are a separate collection that contains fields `id` and `title`.

```yml
- label: Featured Posts
  name: featured
  widget: ncw-reorder
  collection: posts
  id_field: id
  display_fields: ['title']
```
#### Widget specific fields
* `collection` (**required**) is the name of the referenced collection.
* `id_field` (**required**) is a field in the referenced collection which has to be an unique identifier.
* `display_fields` (**required**) list of one ore more fields from the referenced collection to be displayed.
<p>Read more about configuration options on <a href='https://www.netlifycms.org/docs/configuration-options/'  target="_blank">netlifyCMS</a>.</p>

### Register default reorder-component
```js
import cms from 'netlify-cms-app'
import { Widget as ReorderWidget } from '@ncwidgets/reorder'

cms.registerWidget(ReorderWidget)

cms.init()
```

### Register custom reorder-component

```js
import cms from 'netlify-cms-app'
import { createControl } from '@ncwidgets/reorder'

const ListComponent = ({ item }) => (
  <>
    <strong>{item.title}</strong>
    <p style={{ margin: 0, color: '#798291', fontSize: '0.8rem' }}>{item.id}</p>
  </>
)

const CustomReorderPreview = ({ value }) => (
  <section>
    <hr />
    <p>Custom Widget Preview</p>
    {value.map((item, i) => <p key={i}>{item.get('title')}</p>)}
  </section>
)

const CustomReorderControl = createControl({
  renderListItem: item => <ListComponent item={item} />
})

cms.registerWidget({
    name: 'custom-reorder', // Remember to change the name in config as well
    controlComponent: CustomReorderControl,
    previewComponent: CustomReorderPreview,
  })

cms.init()
```

## Contribute

Found a bug or a missing feature? Please feel free to send over a PR, or open an issue with the `bug` or `enhancement` tag.