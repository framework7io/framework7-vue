<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination" v-if="paginationComputed === true"></div>
    <div class="swiper-scrollbar" v-if="scrollbarComputed === true"></div>
    <div class="swiper-button-next" v-if="nextButtonComputed === true"></div>
    <div class="swiper-button-prev" v-if="prevButtonComputed === true"></div>
  </div>
</template>
<script>
  export default {
    beforeDestroy: function () {
      var self = this;
      if (!self.init) return;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    },
    props: {
      'params': Object,
      'pagination': [Boolean, String, Object],
      'scrollbar': [Boolean, String, Object],
      'next-button': [Boolean, String, Object],
      'prev-button': [Boolean, String, Object],
      init: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      paramsComputed: function () {
        return this.params || {};
      },
      paginationComputed: function () {
        if (this.pagination) {
          this.paramsComputed.pagination = '.swiper-pagination';
          return true;
        }
        return false;
      },
      scrollbarComputed: function () {
        if (this.scrollbar) {
          this.paramsComputed.scrollbar = '.swiper-scrollbar';
          return true;
        }
        return false;
      },
      nextButtonComputed: function () {
        if (this.nextButton) {
          this.paramsComputed.nextButton = '.swiper-button-next';
          return true;
        }
        return false;
      },
      prevButtonComputed: function () {
        if (this.prevButton) {
          this.paramsComputed.prevButton = '.swiper-button-prev';
          return true;
        }
        return false;
      }
    },
    methods: {
      onF7Init: function () {
        if (!this.init) return;
        this.swiper = new window.Swiper(this.$el, this.paramsComputed);
      }
    }
  }
</script>