<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Chips" sliding></f7-navbar>

    <f7-block-title>Chips</f7-block-title>
    <f7-block>
      <f7-chip text="Example Chip"></f7-chip>
      <f7-chip text="Another Chip" bg="red" color="white"></f7-chip>
      <f7-chip text="One More Chip" bg="green" color="white"></f7-chip>
      <f7-chip text="Jane Doe" media='<img src="http://lorempixel.com/100/100/people/9/">'></f7-chip>
      <f7-chip text="John Doe" bg="orange" media='<img src="http://lorempixel.com/100/100/people/3/">'></f7-chip>
      <f7-chip text="Another Chip" deleteable @delete="onChipDelete"></f7-chip>
      <f7-chip text="John Doe" media='<img src="http://lorempixel.com/100/100/people/3/">' deleteable @delete="onChipDelete"></f7-chip>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    methods: {
      onChipDelete: function (event){
        console.log('chip-delete');
      }
    }
  }
</script>