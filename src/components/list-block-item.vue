<template>
  <li class="item-content">
    <div class="item-inner">
      <div class="item-title"><slot></slot></div>
    </div>
  </li>
</template>
<script>
  export default {
    props: ['inset'],
    data: function () {
      return {};
    }
  }
</script>