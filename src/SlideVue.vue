<template>
  <section>
    <span id='_slide-vue' v-show='false'>SlideVue By SeolHun</span>
    <aside>
      <div>
        <div
          class='slide-vue-item'
          v-for='(item, index) in this.usedItems' v-bind:key='item.link'
          v-bind:class='index === currentPage - 1 ? "on" : "off"'
        >
          <a v-bind:href='item.link'>
            <img v-bind:src='item.image'>
          </a>
        </div>

        <span class='slide-vue-prev' v-on:click='this.prev'>&lt;</span>
        <span class='slide-vue-next' v-on:click='this.next'>&gt;</span>

        <div class='slide-vue-indicator'>
          <span
            v-for='(item, index) in this.usedItems' v-bind:key='item.link'
          >
            <i
              class='slide-vue-indicator-btn'
              v-bind:class='index === currentPage - 1 ? "on" : "off"'
              v-on:click='this.goTo(index + 1)'
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
    timeout: {
      type: Number,
      default: 5000,
    },
    isAuto: {
      type: Boolean,
      default: true,
    },
    isRepeat: {
      type: Boolean,
      default: true,
    },
    touch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      usedItems: [
        {
          image: './static/1.jpg',
          link: 'https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero',
        }, {
          image: './static/2.jpg',
          link: 'https://www.lezhin.com/ko/comic/dalbox',
        }, {
          image: './static/3.jpg',
          link: 'https://www.lezhin.com/ko/novel/leviathan',
        },
      ],
      currentPage: 1,
      setTimeouts: null,
    };
  },
  created() {
    this.automaticPaging();
  },
  methods: {
    goTo(pageNum, isSync = true) {
      if (isSync) {
        this.resetTimeout();
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
      while (this.setTimeouts >= 0) {
        clearTimeout(this.setTimeouts);
        this.setTimeouts -= 1;
      }
    },
    autoNext() {
      if (this.isLast()) {
        this.goTo(1, false);
        return;
      }
      this.goTo(this.currentPage + 1, false);
    },
    automaticPaging() {
      this.setTimeouts = setTimeout(() => {
        this.autoNext();
        this.automaticPaging();
      }, this.timeout);
    },
  },
  computed: {
    lastPage() {
      return this.usedItems.length;
    },
  },
  watch: {
    items() {
      this.usedItems = [...this.items];
    },
  },
};
</script>

<style>
/*===============
    Slide Main
===============*/
.slide-vue {
  max-width: 1200px;
  position: relative;
  margin: auto;
}

/*===============
      Item
===============*/
.slide-vue-item {
  touch-action: auto;
  width: 100%;
  height: 100%;
}

.slide-vue-item.on {
  display: block !important;
}

.slide-vue-item.off {
  display: none;
}

.slide-vue-item-image {
  width: 100%;
  height: 100%;
}


/*==============================
      Nav: Prev,Next
==============================*/
.slide-vue-prev,
.slide-vue-next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 50px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  z-index: 10;
}

.slide-vue-next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.slide-vue-prev:hover, .slide-vue-next:hover {
  background-color: rgba(0,0,0,0.8);
}

@media screen and (max-width: 768px) {
  .slide-vue-prev,
  .slide-vue-next {
    display: none;
    height: 100%;
  }
}

/*==============================
      Nav: Indicator
==============================*/
.slide-vue-indicator {
  top: 80%;
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

.slide-vue-indicator-btn {
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0px 3px;
  border-radius: 100%;
  background: #fff;
  opacity: 0.4;
}

@media screen and (max-width: 768px) {
  .slide-vue-indicator-btn {
    width: 10px;
    height: 10px;
  }
}

.slide-vue-indicator-btn.on {
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
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
