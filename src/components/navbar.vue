<template>
  <div class="navbar"
  :class="classesObject"
  @navbar:beforeinit="onBeforeInit"
  @navbar:init="onInit"
  @navbar:reinit="onReinit"
  @navbar:beforeremove="onBeforeRemove"
  >
    <slot name="before-inner"></slot>
    <div class="navbar-inner">
      <f7-nav-left v-if="backLink" :back-link="backLink" :sliding="sliding"></f7-nav-left>
      <f7-nav-center v-if="title" :title="title" :sliding="sliding"></f7-nav-center>
      <slot></slot>
    </div>
    <slot name="after-inner"></slot>
  </div>
</template>
<script>
  export default {
    updated: function () {
      var self = this;
      self.$nextTick(function () {
          self.$f7.sizeNavbars();
      });
    },
    props: {
      backLink: [Boolean, String],
      sliding: Boolean,
      title: String,
      theme: String,
      layout: String
    },
    computed: {
      classesObject: function () {
        var co = {}
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    },
    methods: {
      onBeforeInit: function (e) {
        this.$emit('navbar:beforeinit', e);
      },
      onInit: function (e) {
        this.$emit('navbar:init', e);
      },
      onReinit: function (e) {
        this.$emit('navbar:reinit', e);
      },
      onBeforeRemove: function (e) {
        this.$emit('navbar:beforeremove', e);
      }
    }
  }
</script>