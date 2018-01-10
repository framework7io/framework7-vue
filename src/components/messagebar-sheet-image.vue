<template>
  <label class="messagebar-sheet-image checkbox" :class="classes" :style="{ 'background-image': image && `url(${image})`}">
    <input type="checkbox" :checked="checked" @change="onChange">
    <i class="icon icon-checkbox"></i>
    <slot></slot>
  </label>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const MessagebarSheetItemProps = Utils.extend(
    {
      image: String,
      checked: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    props: MessagebarSheetItemProps,
    name: 'f7-messagebar-sheet-image',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    methods: {
      onChange(e) {
        if (this.checked) this.$emit('checked', e);
        else this.$emit('unchecked', e);
        this.$emit('change', e);
      },
    },
  };
</script>
