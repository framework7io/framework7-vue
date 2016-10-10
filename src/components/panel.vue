<template>
  <div class="panel" :class="{'panel-left': side === 'left', 'panel-right': side === 'right', 'panel-cover': effect === 'cover', 'panel-reveal': effect === 'reveal'}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {};
    },
    props: ['side', 'effect']
  }
</script>