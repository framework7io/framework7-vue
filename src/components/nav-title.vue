<template>
  <div class="title" :class="{sliding}"><slot>{{title}}</slot></div>
</template>
<script>
  export default {
    name: 'f7-nav-title',
    props: {
      sliding: Boolean,
      title: String,
    },
  };
</script>
