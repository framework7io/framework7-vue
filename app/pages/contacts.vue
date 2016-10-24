<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Contacts" sliding></f7-navbar>

    <f7-list contacts>
      <f7-list-group v-for="(group, key) in contacts">
        <f7-list-item :title="key" group-title></f7-list-item>
        <f7-list-item v-for="name in group" :title="name"></f7-list-item>
      </f7-list-group>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        contacts: {
          'A': [
            'Aaron',
            'Abbie',
            'Adam',
            'Adele',
            'Agatha',
            'Agnes',
            'Albert',
            'Alexander'
          ],
          'B': [
            'Bailey',
            'Barclay',
            'Bartolo',
            'Bellamy',
            'Belle',
            'Benjamin'
          ],
          'C': [
            'Caiden',
            'Calvin',
            'Candy',
            'Carl',
            'Cherilyn',
            'Chester',
            'Chloe'
          ],
          'V': [
            'Vladimir'
          ]
        }
      }
    }
  }
</script>