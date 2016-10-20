<template>
  <f7-page with-subnavbar>
    <f7-navbar back-link="Back" title="Tabs" sliding>
      <f7-subnavbar sliding>
        <f7-buttons>
          <f7-button tab-link="#tab1" active>Tab 1</f7-button>
          <f7-button tab-link="#tab2">Tab 2</f7-button>
          <f7-button tab-link="#tab3">Tab 3</f7-button>
          <f7-button tab-link="#tab4">Tab 4</f7-button>
        </f7-buttons>
      </f7-subnavbar>
    </f7-navbar>

    <f7-tabs animated>
      <f7-tab id="tab1" active>Tab 1</f7-tab>
      <f7-tab id="tab2">Tab 2</f7-tab>
      <f7-tab id="tab3">Tab 3</f7-tab>
      <f7-tab id="tab4">Tab 4</f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>
  export default {}
</script>