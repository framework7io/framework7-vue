<template>
  <div class="subnavbar" :class="sliding ? 'sliding' : ''">
    <div class="subnavbar-inner" v-if="inner">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    name: 'f7-subnavbar',
    props: {
      sliding: Boolean,
      inner: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>
