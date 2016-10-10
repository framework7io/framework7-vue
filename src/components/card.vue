<template>
  <div class="card">
    <div><slot name="title"></slot>
    <slot name="content"></slot>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {};
    }
  }
</script>