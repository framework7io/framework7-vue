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
        var self = this;
        if (self.pagination === true || self.pagination === '') {
          self.paramsComputed.pagination = '.swiper-pagination';
          return true;
        }
        else if (typeof self.pagination === 'object' || typeof self.pagination === 'string') {
          self.paramsComputed.pagination = self.pagination;
          return true;
        }
        return false;
      },
      scrollbarComputed: function () {
        var self = this;
        if (self.scrollbar || self.scrollbar === '') {
          self.paramsComputed.scrollbar = '.swiper-scrollbar';
          return true;
        }
        else if (typeof self.scrollbar === 'object' || typeof self.scrollbar === 'string') {
          self.paramsComputed.scrollbar = self.scrollbar;
          return true;
        }
        return false;
      },
      nextButtonComputed: function () {
        var self = this;
        if (self.nextButton || self.nextButton === '') {
          self.paramsComputed.nextButton = '.swiper-button-next';
          return true;
        }
        else if (typeof self.nextButton === 'object' || typeof self.nextButton === 'string') {
          self.paramsComputed.nextButton = self.nextButton;
          return true;
        }
        return false;
      },
      prevButtonComputed: function () {
        var self = this;
        if (self.prevButton || self.prevButton === '') {
          self.paramsComputed.prevButton = '.swiper-button-prev';
          return true;
        }
        else if (typeof self.prevButton === 'object' || typeof self.prevButton === 'string') {
          self.paramsComputed.prevButton = self.prevButton;
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