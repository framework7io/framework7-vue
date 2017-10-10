<template>
  <div class="title" :class="classes"><slot>{{title}}</slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-nav-title',
    props: Utils.extend({
      title: String,
      sliding: Boolean,
    }, Mixins.colorProps),
    computed: {
      classes() {
        return Utils.extend({
          slidng: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
