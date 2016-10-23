<template>
  <i class="icon" :class="classesObject">{{material}}<slot></slot></i>
</template>
<script>
  export default {
    props: {
      'color': String,
      'material': String, //Material Icons
      'ion': String, //Ionicons
      'fa': String, //Font Awesome
      'icon': String, //Custom
    },
    computed: {
      classesObject: function () {
        var co = {
          'material-icons': this.material,
          'fa': this.fa
        };
        if (this.color) co['color-' + this.color] = true;
        if (this.ion) co['ion-' + this.ion] = true;
        if (this.fa) co['fa-' + this.fa] = true;
        if (this.icon) co[this.icon] = true;
        return co;
      }
    }
  }
</script>