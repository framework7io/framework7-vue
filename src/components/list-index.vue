<template>
  <div class="list-index" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ListIndexProps = Utils.extend(
    {
      init: {
        type: Boolean,
        default: true,
      },
      listEl: [String, Object],
      indexes: {
        type: [String, Array],
        default: 'auto',
      },
      scrollList: {
        type: Boolean,
        default: true,
      },
      label: {
        type: Boolean,
        default: false,
      },
      iosItemHeight: {
        type: Number,
        default: 14,
      },
      mdItemHeight: {
        type: Number,
        default: 14,
      },
    },
    Mixins.colorProps
  );
  export default {
    props: ListIndexProps,
    name: 'f7-list-index',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy() {
      if (!this.init) return;
      if (this.f7ListIndex && this.f7ListIndex.destroy) {
        this.f7ListIndex.destroy();
      }
    },
    watch: {
      indexes() {
        if (!this.f7ListIndex) return;
        this.f7ListIndex.params.indexes = this.indexes;
        this.update();
      },
    },
    methods: {
      update() {
        if (!this.f7ListIndex) return;
        this.f7ListIndex.update();
      },
      scrollListToIndex(itemContent) {
        if (!this.f7ListIndex) return;
        this.f7ListIndex.scrollListToIndex(itemContent);
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        const {
          $el, listEl, indexes, iosItemHeight, mdItemHeight, scrollList, label,
        } = self;
        self.f7ListIndex = f7.listIndex.create({
          el: $el,
          listEl,
          indexes,
          iosItemHeight,
          mdItemHeight,
          scrollList,
          label,
          on: {
            select(index, itemContent, itemIndex) {
              self.$emit('listindex:select', itemContent, itemIndex);
            },
          },
        });
      },
    },
  };
</script>
