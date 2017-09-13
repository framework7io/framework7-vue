<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-view url="/about/"></f7-view>
  </div>
</template>
<script>
  import { f7View, f7Statusbar } from 'framework7-vue';

  export default {
    components: {
      f7View,
      f7Statusbar,
    },
    mounted() {
      console.log('app mounted');
    },
  };
</script>
