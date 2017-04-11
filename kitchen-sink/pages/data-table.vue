<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Data Table" sliding></f7-navbar>

    <f7-block-title>Plain Table</f7-block-title>
    <f7-table>
      <f7-table-row heading>
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell tablet-only>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell tablet-only>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>Within Card</f7-block-title>
    <f7-table card>
      <f7-table-row heading>
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell tablet-only>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell tablet-only>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>Selectable Rows</f7-block-title>
    <f7-table card selectable>
      <f7-table-row heading :selected="nutrition.length === selectedItems.length" @change="toggleSelected">
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell tablet-only>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition" :selected="item.selected" @change="item.selected = $event.target.checked">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell tablet-only>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>With Title And Actions</f7-block-title>
    <f7-table card selectable>
      <f7-table-header :selected="hasSelected">
        <f7-table-title>{{hasSelected ? selectedItems.length + ' items selected' : 'Nutrition'}}</f7-table-title>
        <f7-table-actions v-if="hasSelected">
          <f7-link icon-if-ios="f7:trash" icon-if-material="material:delete"/>
          <f7-link icon-if-ios="f7:more_vertical_round" icon-if-material="material:more_vert"/>
        </f7-table-actions>
        <f7-table-actions v-else>
          <f7-link icon-if-ios="f7:sort" icon-if-material="material:sort"/>
          <f7-link icon-if-ios="f7:more_vertical_round" icon-if-material="material:more_vert"/>
        </f7-table-actions>
      </f7-table-header>
      <f7-table-row heading :selected="nutrition.length === selectedItems.length" @change="toggleSelected">
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell tablet-only>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition" :selected="item.selected" @change="item.selected = $event.target.checked">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell tablet-only>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>Alternate Header With Actions</f7-block-title>
    <f7-table card selectable>
      <f7-table-header>
        <f7-table-links>
          <f7-link>Add</f7-link>
          <f7-link>Remove</f7-link>
        </f7-table-links>
        <f7-table-actions>
          <f7-link icon-if-ios="f7:sort" icon-if-material="material:sort"/>
          <f7-link icon-if-ios="f7:more_vertical_round" icon-if-material="material:more_vert"/>
        </f7-table-actions>
      </f7-table-header>
      <f7-table-row heading :selected="nutrition.length === selectedItems.length" @change="toggleSelected">
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell></f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition" :selected="item.selected" @change="item.selected = $event.target.checked">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell actions>
          <f7-link icon-if-ios="f7:compose" icon-if-material="material:edit"/>
          <f7-link icon-if-ios="f7:trash" icon-if-material="material:delete"/>
        </f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>Collapsible</f7-block-title>
    <f7-table card collapsible>
      <f7-table-header title="Nutrition"/>
      <f7-table-row heading>
        <f7-table-cell label>Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric>Calories</f7-table-cell>
        <f7-table-cell numeric>Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition">
        <f7-table-cell collapsible-title="Desert" label>{{item.title}}</f7-table-cell>
        <f7-table-cell collapsible-title="Calories" numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell collapsible-title="Fat" numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell collapsible-title="Carbs" numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell collapsible-title="Protein" numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell collapsible-title="Comment">{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>
    <f7-block-title>Sortable</f7-block-title>
    <f7-table card>
      <f7-table-header title="Nutrition"/>
      <f7-table-row heading>
        <f7-table-cell label sortable :sortable-active="sorting === 'title'" :order="order.title === 1 ? 'asc' : 'desc'" @click="sortBy('title')">Desert (100g serving)</f7-table-cell>
        <f7-table-cell numeric sortable :sortable-active="sorting === 'calories'" :order="order.calories === 1 ? 'asc' : 'desc'" @click="sortBy('calories')">Calories</f7-table-cell>
        <f7-table-cell numeric sortable :sortable-active="sorting === 'fat'" :order="order.fat === 1 ? 'asc' : 'desc'" @click="sortBy('fat')">Fat (g)</f7-table-cell>
        <f7-table-cell numeric>Carbs</f7-table-cell>
        <f7-table-cell numeric>Protein (g)</f7-table-cell>
        <f7-table-cell tablet-only>Comment</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="item in nutrition">
        <f7-table-cell label>{{item.title}}</f7-table-cell>
        <f7-table-cell numeric>{{item.calories}}</f7-table-cell>
        <f7-table-cell numeric>{{item.fat}}</f7-table-cell>
        <f7-table-cell numeric>{{item.carbs}}</f7-table-cell>
        <f7-table-cell numeric>{{item.protein}}</f7-table-cell>
        <f7-table-cell tablet-only>{{item.comment}}</f7-table-cell>
      </f7-table-row>
    </f7-table>

    <f7-block-title>Automatic</f7-block-title>
    <f7-table
      card
      title="Nutrition"
      :items="nutrition"
      :headings="['Desert (100g serving)', 'Calories', 'Fat (g)', 'Carbs', 'Protein (g)', 'Comment']"
      :columns="['title', 'calories', 'fat', 'carbs', 'protein', 'comment']"
    />
  </f7-page>
</template>
<script>
  export default {
    computed: {
      selectedItems() {
        return this.nutrition.filter((el) => el.selected);
      },
      hasSelected() {
        return this.selectedItems.length > 0;
      }
    },
    data() {
      return {
        sorting: 'title',
        order: {
          //1: asc, -1: desc
          'title': 1,
          'calories': 1,
          'fat': 1,
        },
        nutrition: [
          {
            title: 'Cupcake',
            calories: '305',
            fat: '3.7',
            carbs: '67',
            protein: '4.3',
            comment: 'Don\'t like it',
            selected: false
          },
          {
            title: 'Eclair',
            calories: '262',
            fat: '16.0',
            carbs: '24',
            protein: '6.0',
            comment: 'Super tasty',
            selected: false
          },
          {
            title: 'Frozen yogurt',
            calories: '159',
            fat: '6.0',
            carbs: '24',
            protein: '4.0',
            comment: 'I like frozen yogurt',
            selected: false
          },
          {
            title: 'Ice cream sandwich',
            calories: '237',
            fat: '9.0',
            carbs: '37',
            protein: '4.3',
            comment: 'But like ice cream more',
            selected: false
          },
        ]
      }
    },
    methods: {
      sortBy (field) {
        var self = this;
        var order = self.order[field];
        if (self.sorting === field) {
          // Flip order
          order = self.order[field] = self.order[field] * -1;
        }
        else self.sorting = field;
        self.nutrition.sort(function (a, b) {
          if (a[field] * 1 === parseFloat(a[field])) {
            return order === 1 ? parseFloat(a[field]) > parseFloat(b[field]) : parseFloat(a[field]) < parseFloat(b[field]);
          }
          return order === 1 ? a[field] > b[field] : a[field] < b[field]
        })
      },
      toggleSelected () {
        var self = this;
        var allSelected = self.selectedItems.length === self.nutrition.length;
        self.nutrition.map((el) => {
          el.selected =  allSelected ? false : true;
        });
      },
      onSort () {}
    }
  }
</script>
