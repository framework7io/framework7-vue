<template>
  <i class="icon" :style="{'font-size':sizeComputed}" :class="classesObject">{{iconTextComputed}}<slot></slot></i>
</template>
<script>
  export default {
    props: {
      'color': String,
      'material': String, //Material Icons
      'f7': String, //Framework7 Icons
      'ion': String, //Ionicons
      'fa': String, //Font Awesome
      'icon': String, //Custom
      'if-material': String,
      'if-ios': String,
      'size': [String, Number]
    },
    computed: {
      sizeComputed: function () {
        var self = this;
        var size = self.size;
        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = size + 'px';
        }
        return size;
      },
      iconTextComputed: function () {
        var self = this;
        var text = self.material || self.f7;
        if (self.ifMaterial && self.$theme.material && (self.ifMaterial.indexOf('material:')>=0 || self.ifMaterial.indexOf('f7:')>=0)) {
          text = self.ifMaterial.split(':')[1];
        }
        else if (self.ifIos && self.$theme.ios && (self.ifIos.indexOf('material:')>=0 || self.ifIos.indexOf('f7:')>=0)) {
          text = self.ifIos.split(':')[1];
        }
        return text;
      },
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.ifMaterial || self.ifIos) {
          var parts = self[self.$theme.material ? 'ifMaterial' : 'ifIos'].split(':');
          var prop = parts[0];
          var value = parts[1];
          if (prop === 'material' || prop === 'fa' || prop === 'f7') {
            co['fa'] = prop === 'fa';
            co['material-icons'] = prop === 'material';
            co['f7-icons'] = prop === 'f7';
          }
          if (prop === 'fa' || prop === 'ion') {
            co[prop + '-' + value] = true;
          }
          if (prop === 'icon') {
            co[value] = true;
          }
        }
        else {
          co = {
            'material-icons': this.material,
            'f7-icons': this.f7,
            'fa': this.fa
          };
          if (this.ion) co['ion-' + this.ion] = true;
          if (this.fa) co['fa-' + this.fa] = true;
          if (this.icon) co[this.icon] = true;
        }
        if (this.color) co['color-' + this.color] = true;
        return co;
      }
    }
  }
</script>