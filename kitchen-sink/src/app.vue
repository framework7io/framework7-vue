<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-view url="/" :main="true"></f7-view>
  </div>
</template>
<script>
  import { f7View, f7Statusbar } from 'framework7-vue';

  export default {
    components: {
      f7View,
      f7Statusbar,
    },
  };
</script>
