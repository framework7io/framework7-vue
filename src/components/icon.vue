<template>
  <i class="icon" :class="classesObject">{{materialTextComputed}}<slot></slot></i>
</template>
<script>
  export default {
    props: {
      'color': String,
      'material': String, //Material Icons
      'ion': String, //Ionicons
      'fa': String, //Font Awesome
      'f7': String, //Font Awesome
      'icon': String, //Custom
      'if-material': String,
      'if-ios': String,
    },
    computed: {
      materialTextComputed: function () {
        var self = this;
        var text = self.material;
        if (self.ifMaterial && self.$material && self.ifMaterial.indexOf('material:')>=0) {
          text = self.ifMaterial.split(':')[1];
        }
        else if (self.ifIos && self.$ios && self.ifIos.indexOf('material:')>=0) {
          text = self.ifIos.split(':')[1];
        }
        return text;
      },
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.ifMaterial || self.ifIos) {
          var parts = self[self.$material ? 'ifMaterial' : 'ifIos'].split(':');
          var prop = parts[0];
          var value = parts[1];
          if (prop === 'material' || prop === 'fa') {
            co[prop === 'fa' ? 'fa' : 'material-icons'] = true;
          }
          if (prop !== 'material' && prop !== 'icon') {
            co[prop + '-' + value] = true;
          }
          if (prop === 'icon') {
            co[value] = true;
          }
        }
        else {
          co = {
            'material-icons': this.material,
            'fa': this.fa
          };
          if (this.ion) co['ion-' + this.ion] = true;
          if (this.f7) co['f7-' + this.ion] = true;
          if (this.fa) co['fa-' + this.fa] = true;
          if (this.icon) co[this.icon] = true;
        }
        if (this.color) co['color-' + this.color] = true;
        return co;
      }
    }
  }
</script>