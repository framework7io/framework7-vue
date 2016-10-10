<template>
  <div class="pages" :class="{'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through'}"><slot></slot></div>
</template>
<script>
  export default {
    props: ['navbar', 'toolbar'],
    data: function () {
      return {};
    }
  }
</script>