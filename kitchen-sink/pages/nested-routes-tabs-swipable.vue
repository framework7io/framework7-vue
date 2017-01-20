<template>
  <f7-page with-subnavbar no-page-content>
    <f7-navbar back-link="Back" title="Tabs Swipeable" sliding>
      <f7-subnavbar sliding>
        <f7-buttons>
          <f7-button route-tab-link="#tab1" href="/nested-routes/tabs-swipable/">Tab 1</f7-button>
          <f7-button route-tab-link="#tab2" href="/nested-routes/tabs-swipable/tab-2">Tab 2</f7-button>
          <f7-button route-tab-link="#tab3" href="/nested-routes/tabs-swipable/tab-3">Tab 3</f7-button>
        </f7-buttons>
      </f7-subnavbar>
    </f7-navbar>

    <f7-tabs swipeable>
      <f7-page-content id="tab1" tab />
      <f7-page-content id="tab2" tab />
      <f7-page-content id="tab3" tab />
    </f7-tabs>
  </f7-page>
</template>
<script>
  export default {}
</script>