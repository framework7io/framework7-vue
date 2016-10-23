<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Data Binding" sliding></f7-navbar>

    <f7-list>
      <f7-list-item>
        <f7-label>Name</f7-label>
        <f7-input type="text" :value="user.name" v-model="user.name"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Last Name</f7-label>
        <f7-input type="text" :value="user.lastName" v-model="user.lastName"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Age</f7-label>
        <f7-input type="select" v-model.number="user.age">
          <option v-for="n in 40" :value="n" :selected="user.age === n">{{n}}</option>
        </f7-input>
      </f7-list-item>
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