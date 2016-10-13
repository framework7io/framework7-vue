<script>
  import Vue from 'vue';
  import CardHeader from './card-header.vue';
  import CardFooter from './card-footer.vue';
  import CardContent from './card-content.vue';
  export default {
    template: '',
    created: function () {
      var template = '<div class="card">';
      var self = this;
      ['header', 'content', 'footer'].forEach(function (part) {
        var prop = part;
        if (part === 'header') prop = 'title';
        if (self[prop]) template += '<f7-card-' + (part) + '>' + self[prop] + '</f7-card-' + (part) + '>'
      });
      template += '<slot></slot>';
      template += '</div>';

      this.$options.template = template;
    },
    props: ['title', 'content', 'footer'],
    data: function () {
      return {};
    },
    components: {
      'f7-card-header': CardHeader,
      'f7-card-footer': CardFooter,
      'f7-card-content': CardContent
    }
  }
</script>