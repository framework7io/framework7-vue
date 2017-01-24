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
      <f7-nav-left v-if="backLink" :back-link="backLink" :sliding="sliding" :back-link-href="backLinkUrl || backLinkHref"></f7-nav-left>
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
      backLinkUrl: String,
      backLinkHref: String,
      sliding: Boolean,
      title: String,
      theme: String,
      layout: String,
      hidden: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'navbar-hidden': this.hidden
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    },
    methods: {
      hide: function () {
        if (!this.$f7) return;
        return this.$f7.hideNavbar(this.$el);
      },
      show: function () {
        if (!this.$f7) return;
        return this.$f7.showNavbar(this.$el);
      },
      size: function () {
        if (!this.$f7 || this.$theme.material) return;
        return this.$f7.sizeNavbars();
      },
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