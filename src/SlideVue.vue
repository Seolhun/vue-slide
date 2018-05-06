<template>
  <section>
    <span id='_slide-vue-name' v-show='false'>SlideVue</span>
    <aside id='_slide-vue'>
      <div class='slide-vue'>
        <div
          class='slide-vue-item'
          v-for='(item, index) in this.usedItems' v-bind:key='item.link'
          v-bind:class='index === currentPage - 1 ? "on" : ""'
        >
          <a v-bind:href='itemLinkKey ? item[itemLinkKey] : item.link'>
            <img
              class='slide-vue-item-image fade'
              v-bind:src='itemImageKey ? item[itemImageKey] : item.image'
              v-bind:style='imageSizeStyleObject'
            >
          </a>
        </div>

        <div>
          <span class='slide-vue-prev' v-on:click='prev'>&lt;</span>
          <span class='slide-vue-next' v-on:click='next'>&gt;</span>
        </div>

        <div class='slide-vue-indicator'>
          <span
            v-for='n in this.lastPage' v-bind:key='n'
          >
            <i
              class='slide-vue-indicator-dot'
              v-bind:class='n === currentPage ? "on" : "off"'
              @click='goTo(n)'
            >
            </i>
          </span>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'SlideVue',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    itemImageKey: {
      type: String,
      default: 'image',
    },
    itemLinkKey: {
      type: String,
      default: 'link',
    },
    timeout: {
      type: Number,
      default: 6000,
    },
    isAuto: {
      type: Boolean,
      default: true,
    },
    isRepeat: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: String,
      default: '500px',
    },
    maxWidth: {
      type: String,
      default: '100%',
    },
    // touch: {
    //   type: Boolean,
    //   default: true,
    // },
    // mobileBreakPoint: {
    //   type: Number,
    //   default: 768,
    // },
    // https://www.w3schools.com/jsref/met_win_matchmedia.asp
  },
  data() {
    return {
      currentPage: 1,
      setTimeouts: null,
      imageSizeStyleObject: {
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
      },
    };
  },
  created() {
    this.automaticPaging();
  },
  methods: {
    goTo(pageNum, isSync = true) {
      if (pageNum > this.lastPage || pageNum < 1) {
        return;
      }
      if (isSync) {
        this.resetTimeout();
        this.automaticPaging();
      }
      this.currentPage = pageNum;
    },
    isFirst() {
      return this.currentPage === 1;
    },
    isLast() {
      return this.currentPage === this.lastPage;
    },
    next() {
      if (this.isLast()) {
        this.goTo(1);
        return;
      }
      this.goTo(this.currentPage + 1);
    },
    prev() {
      if (this.isFirst()) {
        this.goTo(this.lastPage);
        return;
      }
      this.goTo(this.currentPage - 1);
    },
    resetTimeout() {
      if (this.isAuto) {
        while (this.setTimeouts >= 0) {
          clearTimeout(this.setTimeouts);
          this.setTimeouts -= 1;
        }
      }
    },
    automaticPaging() {
      if (this.isAuto) {
        this.setTimeouts = setTimeout(() => {
          if (this.isLast()) {
            if (!this.isRepeat) {
              return;
            }
            this.goTo(1, false);
          } else {
            this.goTo(this.currentPage + 1, false);
          }
          this.automaticPaging();
        }, this.timeout);
      }
    },
  },
  computed: {
    usedItems() {
      return [...this.items];
    },
    lastPage() {
      return this.usedItems.length;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: Verdana, sans-serif;
  margin: 0;
}

img {
  vertical-align: middle;
}

/*===============
    Slide Main
===============*/
.slide-vue {
  position: relative;
  margin: auto;
}

/*===============
      Item
===============*/
.slide-vue-item {
  touch-action: auto;
  display: none;
}

.slide-vue-item.on {
  display: block !important;
}

.slide-vue-item-image {
  width: 100%;
}

/*==============================
      Nav: Prev,Next
==============================*/
.slide-vue-prev, .slide-vue-next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  font-size: 20px;
  padding: 15px 10px;
  color: #fff;
  font-weight: bold;
  font-size: 40px;
  vertical-align: middle;
  z-index: 10;
}

.slide-vue-prev {
  left: 0;
  border-radius: 0 3px 3px 0;
}

.slide-vue-next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.slide-vue-prev:hover,
.slide-vue-next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

@media screen and (max-width: 768px) {
  .slide-vue-prev,
  .slide-vue-next {
    font-size: 25px;
  }
}

/*==============================
      Nav: Indicator
==============================*/
.slide-vue-indicator {
  top: 90%;
  left: 0;
  right: 0;
  margin: 15px 0;
  position: absolute;
  text-align: center;
  z-index: 10;
}

@media screen and (max-width: 768px) {
  .slide-vue-indicator {
    margin: 10px 0;
  }
}

.slide-vue-indicator-dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0px 3px;
  background: #fff;
  display: inline-block;
  transition: background-color 0.6s ease;
  border-radius: 100%;
  opacity: 0.4;
}

@media screen and (max-width: 768px) {
  .slide-vue-indicator-dot {
    width: 10px;
    height: 10px;
  }
}

.slide-vue-indicator-dot.on {
  opacity: 1;
}

/*==============================
          Fade Animation
==============================*/
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
