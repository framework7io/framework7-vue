<template>
  <div class="page" :data-page="name" :class="{'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through', 'with-subnavbar': subnavbar || withSubnavbar}">
    <slot name="fixed-bars"></slot>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      'name': String,
      'navbar': String,
      'toolbar': String,
      'with-subnavbar': Boolean,
      'subnavbar': Boolean
    },
    data: function () {
      return {};
    }
  }
</script>