<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Swiper" sliding></f7-navbar>

    <f7-block-title>Default</f7-block-title>
    <f7-swiper style="height:200px">
      <f7-swiper-slide v-for="n in 10" class="bg-white color-black">Slide {{n}}</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Navigation</f7-block-title>
    <f7-swiper pagination next-button prev-button scrollbar style="height:200px">
      <f7-swiper-slide v-for="n in 10" class="bg-white color-black">Slide {{n}}</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Slides Per View</f7-block-title>
    <f7-swiper :params="{slidesPerView: 3, spaceBetween: 20}" pagination next-button prev-button scrollbar style="height:200px">
      <f7-swiper-slide v-for="n in 10" class="bg-white color-black">Slide {{n}}</f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>
<script>
  export default {}
</script>