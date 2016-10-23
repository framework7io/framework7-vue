<script>
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
    props: ['title', 'content', 'footer']
  }
</script>