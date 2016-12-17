<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Accordion" sliding></f7-navbar>

    <f7-block-title>Accordion List</f7-block-title>
    <f7-list accordion>
      <f7-list-item accordion-item
        v-for="n in 3"
        :title="'Item ' + n"
        @accordion:open="onOpen"
        @accordion:opened="onOpened"
        @accordion:close="onClose"
        @accordion:closed="onClosed"
      >
        <f7-accordion-content>
          <f7-block>
            <p>Accordion content {{n}}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu felis volutpat, rutrum ex quis, lobortis ex. Curabitur quis mattis lorem. Nullam magna lacus, interdum vel maximus nec, vestibulum non quam. Phasellus ornare efficitur porttitor. Quisque neque diam, imperdiet in fermentum nec, congue vitae ante. Nullam imperdiet maximus commodo. Morbi pharetra id purus ac ultrices. Duis non posuere libero.</p>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Custom Collapsible</f7-block-title>
    <f7-block inner>
      <f7-accordion-item v-for="n in 3">
        <f7-accordion-toggle><b>Item {{n}}</b></f7-accordion-toggle>
        <f7-accordion-content>Content {{n}}</f7-accordion-content>
      </f7-accordion-item>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    methods: {
      onOpen: function (event){
        console.log('open');
      },
      onOpened: function (event){
        console.log('opened');
      },
      onClose: function (event){
        console.log('close');
      },
      onClosed: function (event){
        console.log('closed');
      }
    }
  }
</script>