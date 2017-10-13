<template>
  <f7-page>
    <f7-navbar title="Infinite Scroll" back-link="Back"></f7-navbar>
    <div data-infinite-distance="50" class="page-content infinite-scroll-content" @infinite="loadMore">
      <f7-block-title>Scroll bottom</f7-block-title>
      <div class="list simple-list">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
          <li>Item 7</li>
          <li>Item 8</li>
          <li>Item 9</li>
          <li>Item 10</li>
          <li>Item 11</li>
          <li>Item 12</li>
          <li>Item 13</li>
          <li>Item 14</li>
          <li>Item 15</li>
          <li>Item 16</li>
          <li>Item 17</li>
          <li>Item 18</li>
          <li>Item 19</li>
          <li>Item 20</li>
        </ul>
      </div>
      <div class="preloader infinite-scroll-preloader"></div>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
    data: function () {
      return {
        allowInfinite: true,
        lastItem: 20,
      }
    },
    methods: {
      loadMore: function () {
        var self = this;
        var $el = self.$$(self.$el);
        if (!self.allowInfinite) return;
        self.allowInfinite = false;

        setTimeout(function () {
          if (self.lastItem >= 200) {
            $el.find('.preloader').remove();
            return;
          }
          var html = '';

          for (var i = 1; i <= 20; i++) {
            html += '<li>Item ' + (self.lastItem + i) + '</li>';
          }

          $el.find('.list ul').append(html);

          self.lastItem += 20;

          self.allowInfinite = true;
        }, 1000);
      }
    }
  }
</script>
