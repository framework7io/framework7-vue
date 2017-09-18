<template>
<div class="page">
  <f7-navbar title="Tabs Routable" back-link="Back"></f7-navbar>
  <div class="toolbar tabbar">
    <div class="toolbar-inner">
      <a href="./" class="tab-link" data-route-tab-id="tab1">Tab 1</a>
      <a href="tab2/" class="tab-link" data-route-tab-id="tab2">Tab 2</a>
      <a href="tab3/" class="tab-link" data-route-tab-id="tab3">Tab 3</a>
    </div>
  </div>
  <div class="tabs">
    <div class="page-content tab" id="tab1"></div>
    <div class="page-content tab" id="tab2"></div>
    <div class="page-content tab" id="tab3"></div>
  </div>
</div>
</template>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {}
</script>