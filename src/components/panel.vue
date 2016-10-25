<template>
  <div class="panel" :class="classesObject">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'side': String,
      'effect': String,
      'cover': Boolean,
      'reveal': Boolean,
      'left': Boolean,
      'right': Boolean,
      'theme': String,
      'layout': String
    },
    computed: {
      classesObject: function () {
        var self = this;
        var side = self.side || (self.left ? 'left' : 'right');
        var effect = self.effect || (self.reveal ? 'reveal' : 'cover');
        var co = {};
        co['panel-' + side] = true;
        co['panel-' + effect] = true;
        if (self.layout) co['layout-' + self.layout] = true;
        if (self.theme) co['theme-' + self.theme] = true;
        return co;
      }
    }
  }
</script>