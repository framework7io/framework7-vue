<template>
  <f7-page>
    <f7-navbar title="Color Themes" back-link="Back"></f7-navbar>
    <f7-block-title>Choose Color Theme</f7-block-title>
    <div class="block">
      <p>Framework7 comes with {{colorsAmount}} color themes set.</p>
      <div class="row">
        <div class="col-33" v-for="color in colors" :key="color">
          <button class="button button-fill button-round button-raised" :class="`color-${color}`" @click="setColorTheme(color)">
            {{ color }}
          </button>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<style scoped>
  .button {
    margin-bottom: 1em;
    text-transform: capitalize;
  }
</style>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
    data: function () {
      var colors = [
        'red',
        'pink',
        'purple',
        'deeppurple',
        'indigo',
        'blue',
        'lightblue',
        'cyan',
        'teal',
        'green',
        'lightgreen',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deeporange',
        'brown',
        'gray',
        'bluegray',
      ];
      return {
        colors: colors,
        colorsAmount: colors.length,
      };
    },
    methods: {
      setColorTheme: function (color) {
        var self = this;
        var app = self.$f7;
        var currentColorClass = app.root[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) app.root.removeClass(currentColorClass[0])
          app.root.addClass('color-theme-' + color);
      },
    }
  }
</script>
