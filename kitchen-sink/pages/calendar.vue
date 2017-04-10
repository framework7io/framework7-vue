<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Calendar" sliding></f7-navbar>
    <f7-block-title>Default</f7-block-title>
    <f7-block inner>
      <f7-calendar :style="style"/>
    </f7-block>

    <f7-block-title>Multiple</f7-block-title>
    <f7-block inner>
      <f7-calendar :style="style" :multiple="true"/>
    </f7-block>

    <f7-block-title>Range Picker</f7-block-title>
    <f7-block inner>
      <f7-calendar :style="style" :range-picker="true"/>
    </f7-block>



  </f7-page>
</template>
<script>
  export default {
    data () {
      return {
        style: this.$theme.ios ? 'background:#fff; margin:-10px -15px' : 'background:#fff; margin:-16px -16px'
      }
    }
  }
</script>
