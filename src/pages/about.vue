<template>
  <f7-page name="about">
    <p>About Page {{url}}</p>
    <f7-list>
    <f7-list-item title="Hello"></f7-list-item>
    </f7-list>
    <p><a href="#" class="back">Go Back</a></p>
  </f7-page>
</template>
<script>
  export default {
    props: ['url']
  }
</script>