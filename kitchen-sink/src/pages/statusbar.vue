<template>
  <f7-page>
    <f7-navbar title="Statusbar Overlay" back-link="Back"></f7-navbar>
    <div class="block block-strong">
      <p>Framework7 automatically detects if your app in full screen mode, and automatically shows statusbar overlay if app is in full screen mode (or hides statusbar if app is not in full screen mode). Its visibility can be forced using app parameters or using API:</p>
      <p class="row">
        <a class="col button button-raised" @click="showStatusbar">Show Statusbar</a>
        <a class="col button button-raised" @click="hideStatusbar">Hide Statusbar</a>
      </p>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {
    methods: {
      showStatusbar: function () {
        this.$f7.statusbar.show();
      },
      hideStatusbar: function () {
        this.$f7.statusbar.hide();
      },
    }
  }
</script>
