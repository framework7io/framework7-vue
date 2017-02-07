<template>
  <div class="left" :class="{sliding:sliding}">
    <f7-link
      v-if="backLink"
      :href="backLinkUrl || backLinkHref || '#'"
      back
      icon="icon-back"
      :class="{'icon-only': (backLink === true || backLink && $theme.material)}"
      :text="backLink !== true && !$theme.material ? backLink : undefined"
      @click="onBackClick"
      ></f7-link>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkHref: String,
      sliding: Boolean
    },
    methods: {
      onBackClick: function (e) {
        this.$emit('back-click', e);        
        this.$emit('click:back', e);        
      }
    }
  }
</script>