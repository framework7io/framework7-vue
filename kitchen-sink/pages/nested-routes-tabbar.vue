<template>
  <f7-page tabbar-fixed>
    <f7-navbar back-link="Back" title="Nested Routes with a Tab Bar" sliding></f7-navbar>

    <f7-block tabs>
      <f7-tab route-tab-id="tab1" />
      <f7-tab route-tab-id="tab2" />
      <f7-tab route-tab-id="tab3" />
    </f7-block>

    <f7-toolbar tabbar labels>
      <f7-link href="/nested-routes/tabbar/" route-tab-link="#tab1" text="Tab 1" active></f7-link>
      <f7-link href="/nested-routes/tabbar/tab-2/" route-tab-link="#tab2" text="Tab 2"></f7-link>
      <f7-link href="/nested-routes/tabbar/tab-3/" route-tab-link="#tab3" text="Tab 3"></f7-link>
    </f7-toolbar>

  </f7-page>
</template>
<script>
  export default {}
</script>