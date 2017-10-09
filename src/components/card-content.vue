<template>
  <div class="card-content" :class="{'card-content-padding': padding}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'f7-card-content',
    props: {
      padding: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>
