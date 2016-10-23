<template>
  <li>
    <a v-if="title" class="item-link list-button" :href="(typeof link !== 'string' ? '#' : link)" :class="{'external': external || linkExternal, 'back': back}" v-html="title"></a>
    <a v-else class="item-link list-button" :href="(typeof link !== 'string' ? '#' : link)" :class="{'external': external || linkExternal, 'back': back}"><slot></slot></a>
  </li>
</template>
<script>
  export default {
    props: {
      'title': [String, Number],
      'link': [String, Boolean],
      'external': Boolean,
      'link-external': Boolean,
      'back': Boolean
    },
    data: function () {
      return {};
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      }
    }
  }
</script>