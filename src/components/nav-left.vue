<template>
  <div class="left" :class="{sliding:sliding}">
    <a href="#" class="back link" v-if="backLink" :class="{'icon-only': backLink === true}">
      <i class="icon icon-back"></i>
      <span v-if="backLink !== true">{{backLink}}</span>
    </a>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      backLink: [Boolean, String],
      sliding: Boolean
    }
  }
</script>