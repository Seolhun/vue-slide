import Vue from 'vue';
import SlideVue from '@/SlideVue';

describe('SlideVue.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(SlideVue);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#_slide-vue-name').textContent)
      .toEqual('SlideVue');
  });
});
