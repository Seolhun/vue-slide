# Vue-slide

> A Vue Slide Component to show Banners

## Installation
#### NPM

```bash
npm install vue-slide --save
```

Register the component

```js
import SlideVue from 'vue-slide'
```

```js
Vue.component('vue-slide', SlideVue);
```

## Usage

```html
<vue-slide :items="banners"></vue-slide>
```

## Props
| Name | Type | Default | Description |
| ---:| --- | ---| --- |
| items | Array | [] | Items to be render in the Slide |
| timeout | Number | 5000 | Automatically changed item on timeout |
| isAuto | Boolean | true | Whether used or not automatically changing item |
| isRepeat | Boolean | true | Whether used or not repetition when reached last item. |
| touch | Boolean | true | Whether used or not flip using touch action |
