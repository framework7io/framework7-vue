<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Data Binding" sliding>
      <f7-nav-right>
        <f7-link href="/data-binding-edit/">Edit</f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-list>
      <f7-list-item title="Name" :after="user.name"></f7-list-item>
      <f7-list-item title="Last Name" :after="user.lastName"></f7-list-item>
      <f7-list-item title="Age" :after="user.age"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        user: this.$root.user
      }
    }
  }
</script>