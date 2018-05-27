<template>
  <div class="left" :class="classes">
    <f7-link
      v-if="backLink"
      :href="backLinkUrl || '#'"
      back
      icon="icon-back"
      :class="{'icon-only': (backLink === true || backLink && $theme.md)}"
      :text="backLink !== true && !$theme.md ? backLink : undefined"
      :force="backLinkForce || undefined"
      @click="onBackClick"
      ></f7-link>
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7Link from './link.vue';

  const NavLeftProps = Utils.extend({
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-nav-left',
    components: {
      f7Link,
    },
    props: NavLeftProps,
    computed: {
      classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      onBackClick(e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      },
    },
  };
</script>
