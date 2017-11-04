<template>
  <div class="actions-modal-label" :class="classesObject" @click="onClick">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      color: String,
      bold: Boolean
    },
    computed: {
      classesObject: function () {
        var self = this;
        var co = {
          'actions-modal-button-bold': self.bold
        }
        if (self.color) co['color-' + self.color] = true;
        return co
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>