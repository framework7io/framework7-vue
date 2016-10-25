<template>
  <f7-page login-screen no-navbar>
    <f7-login-screen-title>My App</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input name="username" placeholder="Username"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input name="password" type="password" placeholder="Password"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button title="Sign In" back></f7-list-button>
      <f7-list-label>
        <p>Click Sign In to close Login Screen</p>
      </f7-list-label>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {}
</script>