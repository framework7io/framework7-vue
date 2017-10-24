<template>
  <div class="messagebar-attachment" :class="classes" @click="onClick">
    <img v-if="image" :src="image">
    <span v-if="deletable" class="messagebar-attachment-delete" @click="onDeleteClick"></span>
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const MessagebarAttachmentProps = Utils.extend(
    {
      image: String,
      deletable: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    props: MessagebarAttachmentProps,
    name: 'f7-messagebar-attachment',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    methods: {
      onClick(e) {
        this.$emit('attachment:click', e);
      },
      onDeleteClick(e) {
        this.$emit('attachment:delete', e);
      },
    },
  };
</script>
