<template>
  <div id="app">
    <f7-view url="/about/"></f7-view>
  </div>
</template>
<script>
  import { f7View } from '../src/framework7-vue.js';
  export default {
    components: {
      f7View,
    },
    mounted() {
      console.log('app mounted');
    }
  }
</script>
