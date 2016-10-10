<template>
  <div class="navbar">
    <div class="navbar-inner">
      <slot><div class="center" v-if="title">{{title}}</div></slot>
    </div>
  </div>
</template>
<script>
  
  export default {
    props: ['title'],
    data: function () {
      return {};
    }
  }
</script>