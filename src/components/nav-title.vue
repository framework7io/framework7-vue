<template>
  <div class="title" :class="classes"><slot>{{title}}</slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const NavTitleProps = Utils.extend({
    title: String,
    sliding: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-nav-title',
    props: NavTitleProps,
    computed: {
      classes() {
        return Utils.extend({
          slidng: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
