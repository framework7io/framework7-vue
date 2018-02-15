<template>
  <div class="swiper-container" :class="classes">
    <slot name="before-wrapper"></slot>
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination" v-if="paginationComputed === true"></div>
    <div class="swiper-scrollbar" v-if="scrollbarComputed === true"></div>
    <div class="swiper-button-next" v-if="navigationComputed === true"></div>
    <div class="swiper-button-prev" v-if="navigationComputed === true"></div>
    <slot name="after-wrapper"></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const SwiperProps = Utils.extend({
    params: Object,
    pagination: Boolean,
    scrollbar: Boolean,
    navigation: Boolean,
    init: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  export default {
    name: 'f7-swiper',
    beforeDestroy() {
      const self = this;
      if (!self.init) return;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    },
    data() {
      return {
        initialUpdate: false,
      };
    },
    updated() {
      const self = this;
      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }
      if (self.swiper && self.swiper.update) self.swiper.update();
    },
    props: SwiperProps,
    computed: {
      classes() {
        return Mixins.colorClasses(this);
      },
      paginationComputed() {
        const self = this;
        if (self.pagination === true || (self.params && self.params.pagination && !self.params.pagination.el)) {
          return true;
        }
        return false;
      },
      scrollbarComputed() {
        const self = this;
        if (self.scrollbar === true || (self.params && self.params.scrollbar && !self.params.scrollbar.el)) {
          return true;
        }
        return false;
      },
      navigationComputed() {
        const self = this;
        if (self.navigation === true || (self.params && self.params.navigation && !self.params.navigation.nextEl && !self.params.navigation.prevEl)) {
          return true;
        }
        return false;
      },
    },
    methods: {
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        const params = {
          pagination: {},
          navigation: {},
          scrollbar: {},
        };
        if (self.params) Utils.extend(params, self.params);
        if (self.pagination && !params.pagination.el) params.pagination.el = '.swiper-pagination';
        if (self.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
          params.navigation.nextEl = '.swiper-button-next';
          params.navigation.prevEl = '.swiper-button-prev';
        }
        if (self.scrollbar && !params.scrollbar.el) params.scrollbar.el = '.swiper-scrollbar';

        self.swiper = f7.swiper.create(this.$el, params);
      },
    },
  };
</script>
