<template>
  <f7-page>
    <f7-navbar title="Preloader" back-link="Back"></f7-navbar>
    <div class="block">
      <p>How about an activity indicator? Framework 7 has a nice one. The F7 Preloader is made with SVG and animated with CSS so it can be easily resized.</p>
    </div>
    <f7-block-title>Default</f7-block-title>
    <div class="block row demo-preloaders align-items-stretch text-align-center">
      <div class="col-25">
        <div class="preloader"></div>
      </div>
      <div class="col-25 demo-black-col">
        <div class="preloader color-white"></div>
      </div>
      <div class="col-25">
        <div class="preloader preloader-big"></div>
      </div>
      <div class="col-25 demo-black-col">
        <div class="preloader preloader-big color-white"></div>
      </div>
    </div>
    <f7-block-title>Color Preloaders</f7-block-title>
    <div class="block row text-align-center">
      <div class="col-25">
        <div class="preloader color-red"></div>
      </div>
      <div class="col-25">
        <div class="preloader color-green"></div>
      </div>
      <div class="col-25">
        <div class="preloader color-orange"></div>
      </div>
      <div class="col-25">
        <div class="preloader color-blue"></div>
      </div>
    </div>
    <div class="block-title">Multi-color (MD-theme only)</div>
    <div class="block text-align-center">
      <div class="preloader color-multi"></div>
    </div>
    <f7-block-title>Preloader Modals</f7-block-title>
    <div class="block">
      <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
      <p>
        <a class="button button-raised" @click="openIndicator">Open Small Indicator</a>
      </p>
      <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
      <p>
        <a class="button button-raised" @click="openDialog">Open Dialog Preloader</a>
      </p>
      <p>With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
      <p>
        <a class="button button-raised" @click="openCustomDialog">Open Dialog Preloader</a>
      </p>
    </div>
  </f7-page>
</template>
<style scoped>
  .preloader-big {
    width: 42px;
    height: 42px;
  }
  .demo-preloaders .col-25 {
    padding: 5px;
    line-height: 42px;
  }
  .demo-black-col {
    background: #000;
  }
</style>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
    methods: {
      openIndicator: function () {
        var self = this;
        self.$f7.preloader.show();
        setTimeout(function () {
          self.$f7.preloader.hide();
        }, 2000);
      },
      openDialog: function () {
        var self = this;
        self.$f7.dialog.preloader();
        setTimeout(function () {
          self.$f7.dialog.close();
        }, 2000);
      },
      openCustomDialog: function () {
        var self = this;
        self.$f7.dialog.preloader('My text...');
        setTimeout(function () {
          self.$f7.dialog.close();
        }, 2000);
      },
    }
  }
</script>
