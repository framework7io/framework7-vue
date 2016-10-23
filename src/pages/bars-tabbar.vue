<template>
  <f7-page tabbar-fixed>
    <f7-navbar back-link="Back" title="Tab Bar" sliding></f7-navbar>

    <f7-block tabs>
      <f7-tab id="tab1" active>
        <p>Tab 1</p>
      </f7-tab>
      <f7-tab id="tab2">
        <p>Tab 2</p>
      </f7-tab>
      <f7-tab id="tab3">
        <p>Tab 3</p>
      </f7-tab>
    </f7-block>

    <f7-toolbar tabbar>
      <f7-link href="#tab1" tab-link active text="Tab 1"></f7-link>
      <f7-link href="#tab2" tab-link text="Tab 2"></f7-link>
      <f7-link href="#tab3" tab-link text="Tab 3"></f7-link>
    </f7-toolbar>

  </f7-page>
</template>
<script>
  export default {}
</script>