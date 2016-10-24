<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Progress Bar" sliding></f7-navbar>

    <f7-block-title>Progressbar</f7-block-title>
    <f7-list>
      <f7-list-item>
        <f7-progressbar :progress="20"></f7-progressbar>
      </f7-list-item>
      <f7-list-item>
        <f7-progressbar :progress="50" color="red"></f7-progressbar>
      </f7-list-item>
      <f7-list-item>
        <f7-progressbar :progress="70" color="green"></f7-progressbar>
      </f7-list-item>
      <f7-list-item>
        <f7-progressbar infinite color="blue"></f7-progressbar>
      </f7-list-item>
      <f7-list-item>
        <f7-progressbar infinite color="multi"></f7-progressbar>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {}
</script>