<template>
  <div class="subnavbar" :class="classes">
    <div class="subnavbar-inner" v-if="inner">
      <div v-if="title" class="title">{{title}}</div>
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const SubnavbarProps = Utils.extend({
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  export default {
    name: 'f7-subnavbar',
    props: SubnavbarProps,
    computed: {
      classes() {
        return Utils.extend({
          sliding: this.sliding,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
