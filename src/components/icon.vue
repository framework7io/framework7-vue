<template>
  <i class="icon" :style="{'font-size':sizeComputed}" :class="classes">{{iconTextComputed}}<slot></slot></i>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const IconProps = Utils.extend(
    {
      material: String, // Material Icons
      f7: String, // Framework7 Icons
      ion: String, // Ionicons
      fa: String, // Font Awesome
      icon: String, // Custom
      ifMd: String,
      ifIos: String,
      size: [String, Number],
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-icon',
    props: IconProps,
    computed: {
      sizeComputed() {
        const self = this;
        let size = self.size;
        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = `${size}px`;
        }
        return size;
      },
      iconTextComputed() {
        const self = this;
        let text = self.material || self.f7;
        if (self.ifMd && self.$theme.md && (self.ifMd.indexOf('material:') >= 0 || self.ifMd.indexOf('f7:') >= 0)) {
          text = self.ifMd.split(':')[1];
        } else if (self.ifIos && self.$theme.ios && (self.ifIos.indexOf('material:') >= 0 || self.ifIos.indexOf('f7:') >= 0)) {
          text = self.ifIos.split(':')[1];
        }
        return text;
      },
      classes() {
        let classes = {};
        const self = this;
        if (self.ifMd || self.ifIos) {
          const parts = self[self.$theme.md ? 'ifMd' : 'ifIos'].split(':');
          const prop = parts[0];
          const value = parts[1];
          if (prop === 'material' || prop === 'fa' || prop === 'f7') {
            classes.fa = prop === 'fa';
            classes['material-icons'] = prop === 'material';
            classes['f7-icons'] = prop === 'f7';
          }
          if (prop === 'fa' || prop === 'ion') {
            classes[`${prop}-${value}`] = true;
          }
          if (prop === 'icon') {
            classes[value] = true;
          }
        } else {
          classes = {
            'material-icons': this.material,
            'f7-icons': this.f7,
            fa: this.fa,
          };
          if (this.ion) classes[`ion-${this.ion}`] = true;
          if (this.fa) classes[`fa-${this.fa}`] = true;
          if (this.icon) classes[this.icon] = true;
        }
        return Utils.extend(classes, Mixins.colorClasses(self));
      },
    },
  };
</script>
