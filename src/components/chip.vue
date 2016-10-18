<template>
  <span class="chip" :class="chipClassObject" @click="onClick">
    <span v-if="media" class="chip-media" :class="mediaClassObject" v-html="media"></span>
    <span class="chip-label" v-if="text" v-html="text"></span>
    <a href="#" class="chip-delete" v-if="deleteable" @click="onDeleteClick"></a>
  </span>
</template>
<script>
  export default {
    props: {
      media: String,
      text: [String, Number],
      deleteable: Boolean,
      color: String,
      bg: String,
      mediaBg: String,
      mediaColor: String
    },
    computed: {
      mediaClassObject: function () {
        var c = {};
        if (this.mediaColor) c['color-' + this.mediaColor] = true;
        if (this.mediaBg) c['color-' + this.mediaBg] = true;
        return c;
      },
      chipClassObject: function () {
        var c = {};
        if (this.color) c['color-' + this.color] = true;
        if (this.bg) c['bg-' + this.bg] = true;
        return c;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onDeleteClick: function (event) {
        this.$emit('delete', event);
      }
    }
  }
</script>