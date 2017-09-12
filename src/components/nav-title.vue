<template>
  <div class="title" :class="{sliding}"><slot>{{title}}</slot></div>
</template>
<script>
  export default {
    props: {
      sliding: Boolean,
      title: String,
    },
  };
</script>
