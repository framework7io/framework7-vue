<template>
  <div class="left" :class="{sliding:sliding}">
    <f7-link
      v-if="backLink"
      href="#"
      back
      icon="icon-back"
      :class="{'icon-only': backLink === true}"
      :text="backLink !== true && !$material ? backLink : undefined"
      ></f7-link>
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