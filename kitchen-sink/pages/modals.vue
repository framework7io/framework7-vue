<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Modals" sliding></f7-navbar>

    <f7-block>
      <f7-grid>
        <f7-col>
          <!--
          Using state:
          -->
          <f7-button @click="openLoginScreen">Login Screen</f7-button>
          <!--
          Or using F7 API:
          <f7-button open-login-screen="#demo-login-screen">Login Screen</f7-button>
          -->
        </f7-col>
        <f7-col>
          <!--
          Using state:
          -->
          <f7-button @click="openPopup">Popup</f7-button>
          <!--
          Or using F7 API:
          <f7-button open-popup="#demo-popup">Popup</f7-button>
          -->
        </f7-col>
      </f7-grid>
    </f7-block>
    <f7-block>
      <f7-grid>
        <f7-col>
          <f7-button open-popover="#demo-popover">Popover</f7-button>
        </f7-col>
        <f7-col>
          <!--
          Using state:
          -->
          <f7-button @click="openPicker">Picker</f7-button>
          <!--
          Or using F7 API:
          <f7-button open-picker="#demo-picker">Picker</f7-button>
          -->
        </f7-col>
        <f7-col>
          <f7-button @click="openActions">Actions</f7-button>
        </f7-col>
      </f7-grid>
    </f7-block>

    <f7-block>
      <f7-grid>
        <f7-col>
          <f7-button @click="openAlert">Alert</f7-button>
        </f7-col>
        <f7-col>
          <f7-button @click="openConfirm">Confirm</f7-button>
        </f7-col>
      </f7-grid>
    </f7-block>

    <f7-block>
      <f7-grid>
        <f7-col>
          <f7-button @click="openPrompt">Prompt</f7-button>
        </f7-col>
        <f7-col>
          <f7-button @click="openPreloader">Preloader</f7-button>
        </f7-col>
      </f7-grid>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    methods: {
      openAlert: function () {
        var self = this;
        self.$f7.alert('Hi, this is alert', 'Alert Title')
      },
      openConfirm: function () {
        var self = this;
        self.$f7.confirm('Are you sure want to do it?', 'Confirm Title', function () {
          console.log('Confirm Ok');
        }, function () {
          console.log('Confirm Cancel')
        })
      },
      openPrompt: function () {
        var self = this;
        self.$f7.prompt('Your name please!', 'Prompt Title', function (value) {
          self.$f7.alert('Your name is: ' + value, 'Your name')
        })
      },
      openPreloader: function () {
        var self = this;
        self.$f7.showPreloader('Loading text...');
        setTimeout(function () {
          self.$f7.hidePreloader();
        }, 3000);
      },
      openPopup: function () {
        var self = this;
        self.$root.popupOpened = true;
      },
      openPicker: function () {
        var self = this;
        self.$root.pickerOpened = true;
      },
      openLoginScreen: function () {
        var self = this;
        self.$root.loginScreenOpened = true;
      },
      openActions: function () {
        var self = this;
        self.$root.actionsOpened = true;
      }
    }
  }
</script>
