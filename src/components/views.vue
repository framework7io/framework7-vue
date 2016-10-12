<template>
  <div class="views" :class="{'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through'}" ><slot></slot></div>
</template>
<script>
  export default {
    data: function () {
      return {};
    },
    props: ['navbar', 'toolbar']
  }
</script>