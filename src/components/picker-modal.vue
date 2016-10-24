<script>
  export default {
    render: function (c) {
      var pickerEl, innerEl, fixedList = [], staticList = [];
      var self = this;

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');

      var tag, child;

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue;
          }
          var isFixed = false;
          for (var j = 0; j < fixedTags.length; j++) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) fixedList.push(child);
          else staticList.push(child);
        }
      }

      innerEl = c('div', {
        class: {
          'picker-modal-inner': true
        },
      }, staticList)

      return c('div', {
        class: self.classesObject,
        attrs: {
          style: self.opened ? 'display: block' : false
        }
      }, [fixedList, innerEl]);
    },
    props: {
      'opened': Boolean,
      'theme': String,
      'layout': String,
    },
    computed: {
      classesObject: function () {
        var co = {
          'picker-modal': true,
          'opened': this.opened
        };
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.opened) co['modal-in'] = this.opened;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    }
  }
</script>