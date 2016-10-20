<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Preloader" sliding></f7-navbar>

    <f7-block-title>Preloader</f7-block-title>
    <f7-block inner>
      <p>
        <f7-grid>
          <f7-col>
            <f7-preloader></f7-preloader>
          </f7-col>
          <f7-col style="background: #333">
            <f7-preloader color="white"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader :size="44"></f7-preloader>
          </f7-col>
          <f7-col style="background: #333">
            <f7-preloader :size="44" color="white"></f7-preloader>
          </f7-col>
        </f7-grid>
      </p>
      <p>
        <f7-grid>
          <f7-col>
            <f7-preloader :size="44" color="red"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader :size="44" color="blue"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader :size="44" color="green"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader :size="44" color="multi"></f7-preloader>
          </f7-col>
        </f7-grid>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {}
</script>