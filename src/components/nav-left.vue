<template>
  <div class="left" :class="{sliding:sliding}">
    <a href="#" class="back link" v-if="backLink" :class="{'icon-only': backLink === true}">
      <i class="icon icon-back"></i>
      <span v-if="backLink !== true && !material">{{backLink}}</span>
    </a>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    computed: {
      material: function () {
        var mt = false;
        if ((this.$f7 && this.$f7.params.material) || (this.$root.$options.framework7 && this.$root.$options.framework7.material)) mt = true;
        return mt;
      }
    },
    props: {
      backLink: [Boolean, String],
      sliding: Boolean
    }
  }
</script>