<template>
  <a :href="link && (typeof link === 'string' ? link : '#')" class="button" :class="classObject"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      'text': String,
      'link': [String, Boolean],
      'external': Boolean,
      'link-external': Boolean,

      'color': String,
      'ripple-color': String,

      'round': Boolean,
      'fill': Boolean,
      'big': Boolean,
      'raised': Boolean,

      'active': Boolean
    },
    computed: {
        classObject: function () {
            var self = this;
            var co = {
                active: self.active,
            };
            ['round', 'fill', 'big', 'raised'].forEach(function (prop, index) {
                if (self[prop]) co['button-' + prop] = true;
            });
            if (self.color) co['color-' + self.color] = true;
            if (self.rippleColor) co['ripple-' + self.rippleColor] = true;
            return co;
        }
    },
    data: function () {
      return {};
    }
  }
</script>