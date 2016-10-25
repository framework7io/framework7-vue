<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Grid" sliding></f7-navbar>

    <f7-block-title>Grid</f7-block-title>
    <f7-block inner>
      <p>
        <f7-grid>
          <f7-col :style="columnStyle">50%</f7-col>
          <f7-col :style="columnStyle">50%</f7-col>
        </f7-grid>
      </p>
      <p>
        <f7-grid>
          <f7-col :style="columnStyle">33%</f7-col>
          <f7-col :style="columnStyle">33%</f7-col>
          <f7-col :style="columnStyle">33%</f7-col>
        </f7-grid>
      </p>
      <p>
        <f7-grid>
          <f7-col width="50" tablet-width="80" :style="columnStyle">50%</f7-col>
          <f7-col width="25" tablet-width="10" :style="columnStyle">25%</f7-col>
          <f7-col width="25" tablet-width="10" :style="columnStyle">25%</f7-col>
        </f7-grid>
      </p>
      <p>
        <f7-grid no-gutter>
          <f7-col width="66" :style="columnStyle">66%</f7-col>
          <f7-col width="33" :style="columnStyle">33%</f7-col>
        </f7-grid>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        columnStyle: 'border: 1px solid #e5e5e5; padding:5px; text-align: center'
      }
    }
  }
</script>