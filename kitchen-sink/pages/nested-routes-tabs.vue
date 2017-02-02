<template>
  <f7-page with-subnavbar>
    <f7-navbar back-link="Back" title="Nested Routes with Tabs" sliding>
      <f7-subnavbar sliding>
        <f7-buttons>
          <f7-button route-tab-link="#tab1" href="/nested-routes/tabs/">Tab 1</f7-button>
          <f7-button route-tab-link="#tab2" href="/nested-routes/tabs/tab-2/">Tab 2</f7-button>
          <f7-button route-tab-link="#tab3" href="/nested-routes/tabs/tab-3/">Tab 3</f7-button>          
        </f7-buttons>
      </f7-subnavbar>
    </f7-navbar>

    <f7-tabs>
      <f7-tab route-tab-id="tab1" />
      <f7-tab route-tab-id="tab2" />
      <f7-tab route-tab-id="tab3" />      
    </f7-tabs>
  </f7-page>
</template>
<script>
  export default {}
</script>