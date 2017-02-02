<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Dynamic Route" sliding></f7-navbar>

    <ul>
      <li><b>Url:</b> {{$route.url}}</li>
      <li><b>Path:</b> {{$route.path}}</li>
      <li><b>Hash:</b> {{$route.hash}}</li>
      <li><b>Params:</b>
        <ul>
          <li v-for="(value, key) in $route.params"><b>{{key}}:</b> {{value}}</li>
        </ul>
      </li>
      <li><b>Query:</b>
        <ul>
          <li v-for="(value, key) in $route.query"><b>{{key}}:</b> {{value}}</li>
        </ul>
      </li>
      <li><b>Route:</b> {{$route.route.path}}</li>
    </ul>
  </f7-page>
</template>
<script>
  export default {}
</script>