<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Data Table" sliding></f7-navbar>

    <f7-block-title>Plain Table</f7-block-title>
    <f7-table card selectable>
      <f7-table-row heading>
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition">
        <f7-table-cell label>{{item.label}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        nutrition: [
          {
            label: 'Frozen yogurt',
            calories: '159',
            fat: '6.0',
            carbs: '24',
            protein: '4.0',
            comment: ''
          },
          {
            label: 'Ice cream sandwich',
            calories: '237',
            fat: '9.0',
            carbs: '37',
            protein: '4.3',
            comment: ''
          },
          {
            label: 'Eclair',
            calories: '262',
            fat: '16.0',
            carbs: '24',
            protein: '6.0',
            comment: ''
          },
          {
            label: 'Cupcake',
            calories: '305',
            fat: '3.7',
            carbs: '67',
            protein: '4.3',
            comment: ''
          },
        ]
      }
    }
  }
</script>
