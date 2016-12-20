<template>
  <div class="timeline" :class="classesObject">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'sides': Boolean,
      'tablet-sides': Boolean,
      'col': [Number, String],
      'tablet-col': [Number, String],
      'horizontal': Boolean
    },
    computed: {
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.sides) co['timeline-sides'] = true;
        if (self.tabletSides) co['tablet-sides'] = true;
        if (self.horizontal) co['timeline-horizontal'] = true;
        if (self.col) co['col-' + self.col] = true;
        if (self.tabletCol) co['tablet-' + self.tabletCol] = true;
        return co;
      }
    }
  }
</script>