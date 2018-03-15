<template>
  <div class="title" :class="classes"><slot>{{title}}<span class="subtitle" v-if="subtitle">{{subtitle}}</span></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const NavTitleProps = Utils.extend({
    title: String,
    subtitle: String,
    sliding: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-nav-title',
    props: NavTitleProps,
    computed: {
      classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
