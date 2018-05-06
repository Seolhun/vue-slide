# Vue-slide

> A Vue Slide Component to show Banners

## Installation
#### NPM

```bash
npm install @seolhun/vue-slide --save
```

## Register the component

```js
import SlideVue from '@seolhun/vue-slide'
```

```js
Vue.component('vue-slide', SlideVue);
```

## Usage

#### 1. Default items
```html
<!--
const banners = [
  {
    image: '',
    link: '',
  }, {
    image: '',
    link: '',
  },
]
-->
<vue-slide :items='banners'></vue-slide>
```

#### 2. Custom items
```html
<!--
const banners = [
  {
    img: '',
    url: '',
  }, {
    img: '',
    url: '',
  },
]
-->
<vue-slide :items='banners' :itemImageKey='img' :itemLinkKey='url'></vue-slide>
```

## Props
| Name | Type | Default | Description |
| ---:| --- | ---| --- |
| items | Array | [] | Items to be render in the Slide |
| itemImageKey | String | 'image' | Image key of items to show client |
| itemLinkKey | String | 'link' | Link key of items to show client |
| timeout | Number | 6000 | Automatically changed item on timeout |
| isAuto | Boolean | true | Whether used or not automatically changing item |
| isRepeat | Boolean | true | Whether used or not repetition when reached last item. |

<!-- | touch | Boolean | true | Whether used or not flip using touch action | -->

## Next Update List
- Mobile Break point prop will be added for custom.
- Touch prop will be added for mobile touch.
