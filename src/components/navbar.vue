<template>
  <div class="navbar">
    <div class="navbar-inner">
      <slot><div class="center" v-if="title" v-html="title"></div></slot>
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
    props: ['title']
  }
</script>