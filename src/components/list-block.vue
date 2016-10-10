<template>
  <div class="list-block" :class="{'inset': inset}">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['inset'],
    data: function () {
      return {};
    }
  }
</script>