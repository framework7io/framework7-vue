<template>
  <div class="card">
    <f7-card-header v-if="title" v-html="title"></f7-card-header>
    <div class="card-content" v-if="content">
      <div class="card-content-inner" v-html="content"></div>
    </div>
    <f7-card-footer v-if="footer" v-html="footer"></f7-card-footer>
    <slot></slot>
  </div>
</template>
<script>
  import CardHeader from './card-header.vue';
  import CardFooter from './card-footer.vue';
  import CardContent from './card-content.vue';
  export default {
    props: ['title', 'content', 'footer'],
    data: function () {
      return {};
    },
    components: {
      'f7-card-header': CardHeader,
      'f7-card-footer': CardFooter,
      'f7-card-content': CardContent
    }
  }
</script>