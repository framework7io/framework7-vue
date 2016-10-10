<template>
  <div class="view" :class="{'view-main': main, 'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through'}"><slot></slot></div>
</template>
<script>
  export default {
    data: function () {
      return {};
    },
    props: ['main', 'navbar', 'toolbar']
  }
</script>