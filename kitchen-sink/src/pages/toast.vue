<template>
  <f7-page>
    <f7-navbar title="Toast" back-link="Back"></f7-navbar>
    <div class="block">
      <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
      <p>
        <a href="#" class="button button-raised" @click="showToastBottom">Toast on Bottom</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastTop">Toast on Top</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastCenter">Toast on Center</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastIcon">Toast with icon</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastLargeMessage">Toast with large message</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastWithButton">Toast with close button</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastWithCustomButton">Toast with custom button</a>
      </p>
      <p>
        <a href="#" class="button button-raised" @click="showToastWithCallback">Toast with callback on close</a>
      </p>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {
    methods: {
      showToastBottom: function () {
        var self = this;
        // Create toast
        if (!self.toastBottom) {
          self.toastBottom = self.$f7.toast.create({
            message: 'This is default bottom positioned toast',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastBottom.open();
      },
      showToastTop: function () {
        var self = this;
        // Create toast
        if (!self.toastTop) {
          self.toastTop = self.$f7.toast.create({
            message: 'Top positioned toast',
            position: 'top',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastTop.open();
      },
      showToastCenter: function () {
        var self = this;
        // Create toast
        if (!self.toastCenter) {
          self.toastCenter = self.$f7.toast.create({
            message: 'I\'m on center',
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastCenter.open();
      },
      showToastIcon: function () {
        var self = this;
        // Create toast
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            message: 'I\'m on center',
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastIcon.open();
      },
      showToastLargeMessage: function () {
        var self = this;
        // Create toast
        if (!self.toastLargeMessage) {
          self.toastLargeMessage = self.$f7.toast.create({
            message: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastLargeMessage.open();
      },
      showToastWithButton: function () {
        var self = this;
        // Create toast
        if (!self.toastWithButton) {
          self.toastWithButton = self.$f7.toast.create({
            message: 'Toast with additional close button',
            closeButton: true,
          });
        }
        // Open it
        self.toastWithButton.open();
      },
      showToastWithCustomButton: function () {
        var self = this;
        // Create toast
        if (!self.toastWithCustomButton) {
          self.toastWithCustomButton = self.$f7.toast.create({
            message: 'Custom close button',
            closeButton: true,
            closeButtonText: 'Close Me',
            closeButtonColor: 'red',
          });
        }
        // Open it
        self.toastWithCustomButton.open();
      },
      showToastWithCallback: function () {
        var self = this;
        // Create toast
        if (!self.toastWithCallback) {
          self.toastWithCallback = self.$f7.toast.create({
            message: 'Callback on close',
            closeButton: true,
            on: {
              close: function () {
                self.$f7.dialog.alert('Toast closed');
              },
            }
          });
        }
        // Open it
        self.toastWithCallback.open();
      },
    },
    on: {
      pageBeforeOut: function () {
        var self = this;
        self.$f7.toast.close();
      },
      pageBeforeRemove: function () {
        var self = this;
        // Destroy toasts when page removed
        if (self.toastBottom) self.toastBottom.destroy();
        if (self.toastTop) self.toastTop.destroy();
        if (self.toastCenter) self.toastCenter.destroy();
        if (self.toastIcon) self.toastIcon.destroy();
        if (self.toastLargeMessage) self.toastLargeMessage.destroy();
        if (self.toastWithButton) self.toastWithButton.destroy();
        if (self.toastWithCustomButton) self.toastWithCustomButton.destroy();
        if (self.toastWithCallback) self.toastWithCallback.destroy();
      },
    }
  }
</script>
