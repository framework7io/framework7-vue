<template>
  <div class="page" :data-page="name" :class="{'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through'}">
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {};
    },
    props: ['name', 'navbar', 'toolbar']
  }
</script>