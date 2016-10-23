<template>
  <div class="navbar" :class="classesObject">
    <div class="navbar-inner">
      <f7-nav-left v-if="backLink" :backLink="backLink" :sliding="sliding"></f7-nav-left>
      <f7-nav-center v-if="title" :title="title" :sliding="sliding"></f7-nav-center>
      <slot></slot>
    </div>
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
    }
  }
</script>