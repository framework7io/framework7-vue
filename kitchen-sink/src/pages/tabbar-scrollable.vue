<template>
  <f7-page>
    <div class="navbar">
      <div class="navbar-inner sliding">
        <div class="left">
            <a href="#" class="link back">
              <i class="icon icon-back"></i>
              <span class="ios-only">Back</span>
            </a>
          </div>
        <div class="title">Tabbar Scrollable</div>
        <div class="right md-only">
          <a class="link" @click="toggleToolbarPosition">
            <i class="icon material-icons rotate-icon">compare_arrows</i>
          </a>
        </div>
      </div>
    </div>
    <div class="toolbar tabbar tabbar-scrollable">
      <div class="toolbar-inner">
        <a v-for="(tab, index) in tabs" :key="tab" :href="`#tab-${tab}`"
         class="tab-link" :class="{ 'tab-link-active' : index === 0 }">
         Tab {{tab}}
         </a>
      </div>
    </div>
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="tab" :id="`tab-${tab}`" class="page-content tab" :class="{ 'tab-active' : index === 0 }">
        <div class="block">
          <p><b>Tab {{tab}} content</b></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque corrupti, quos asperiores unde aspernatur illum odio, eveniet. Fugiat magnam perspiciatis ex dignissimos, rerum modi ea nesciunt praesentium iusto optio rem?</p>
          <p>Illo debitis et recusandae, ipsum nisi nostrum vero delectus quasi. Quasi, consequatur! Corrupti, explicabo maxime incidunt fugit sint dicta saepe officiis sed expedita, minima porro! Ipsa dolores quia, delectus labore!</p>
          <p>At similique minima placeat magni molestias sunt deleniti repudiandae voluptatibus magnam quam esse reprehenderit dolor enim qui sed alias, laboriosam quaerat laborum iure repellat praesentium pariatur dolorum possimus veniam! Consectetur.</p>
          <p>Sunt, sed, magnam! Qui, suscipit. Beatae cum ullam necessitatibus eligendi, culpa rem excepturi consequatur quidem totam eum voluptates nihil, enim pariatur incidunt corporis sed facere magni earum tenetur rerum ea.</p>
          <p>Veniam nulla quis molestias voluptatem inventore consectetur iusto voluptatibus perferendis quisquam, cupiditate voluptates, tenetur vero magnam nisi animi praesentium atque adipisci optio quod aliquid vel delectus ad? Dicta deleniti, recusandae.</p>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<style scoped>
  .rotate-icon {
    transform: rotate(90deg);
  }
</style>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {
    data: function () {
      return {
        tabs: [1,2,3,4,5,6,7,8,9,10],
      }      },
    methods: {
      toggleToolbarPosition: function () {
        this.$$(this.$el).find('.toolbar, .tabbar').toggleClass('toolbar-bottom-md');
      },
    }
  }
</script>
