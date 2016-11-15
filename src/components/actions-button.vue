<template>
  <div class="actions-modal-button" :class="classesObject" @click="onClick">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'color': String,
      'bold': Boolean,
      'close': {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        var self = this;
        var co = {
          'actions-modal-button-bold': self.bold
        }
        if (self.color) co['color-' + self.color] = true;
        return co;
      }
    },
    methods: {
      onClick: function (event) {
        if (this.close && this.$f7) {
          this.$f7.closeModal(this.$parent.$parent.$el);
        }
        this.$emit('click', event);
      }
    }
  }
</script>