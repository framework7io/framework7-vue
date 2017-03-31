<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Calendar" sliding></f7-navbar>
    <f7-block-title>Default</f7-block-title>
    <f7-block inner>
      <f7-calendar style="background:#fff; margin:-10px -15px" :footer="false" :header="false"/>
    </f7-block>

    <f7-block-title>Multiple</f7-block-title>
    <f7-block inner>
      <f7-calendar style="background:#fff; margin:-10px -15px" :multiple="true" :footer="false" :header="false"/>
    </f7-block>

    <f7-block-title>Range Picker</f7-block-title>
    <f7-block inner>
      <f7-calendar style="background:#fff; margin:-10px -15px" :range-picker="true" :footer="false" :header="false"/>
    </f7-block>



  </f7-page>
</template>
<script>
  export default {

  }
</script>
