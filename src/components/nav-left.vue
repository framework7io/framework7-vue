<template>
  <div class="left" :class="{ sliding }">
    <f7-link
      v-if="backLink"
      :href="backLinkUrl || '#'"
      back
      icon="icon-back"
      :class="{'icon-only': (backLink === true || backLink && $theme.md)}"
      :text="backLink !== true && !$theme.md ? backLink : undefined"
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
      sliding: Boolean,
    },
    methods: {
      onBackClick(e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      },
    },
  };
</script>
