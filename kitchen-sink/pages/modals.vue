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
        <f7-col>
          <f7-button @click="openInlinePopup">Inline Popup</f7-button>
          <f7-popup :opened="inlinePopupOpened" @popup:closed="closeInlinePopup">
            <f7-view>
              <f7-pages>
                <f7-page navbar-fixed>
                  <f7-navbar title="Demo Popup">
                    <f7-nav-right>
                      <!-- Using state: -->
                      <f7-link @click="closeInlinePopup">Close</f7-link>
                      <!--
                      Or using F7 API:
                      <f7-link close-popup>Close</f7-link>
                      -->
                    </f7-nav-right>
                  </f7-navbar>
                  <f7-block>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis iste qui architecto recusandae veniam delectus vero libero illo aliquid, fuga ratione vel facilis iure est fugiat sunt nihil, consectetur veritatis.</p>
                    <p>Itaque impedit, nam, sed reprehenderit quaerat commodi veritatis ducimus eos nisi, at aliquam dolorum alias optio natus. Sit voluptate aperiam, cupiditate repellat quod fugiat non doloribus eveniet dolorem fugit nihil.</p>
                    <p>Error cumque sunt dolorem aut, similique accusantium delectus. Minima, natus. Doloremque ratione veniam cupiditate modi aspernatur debitis possimus iure id delectus! Totam eveniet, impedit minus deserunt aliquid facere laboriosam dignissimos.</p>
                    <p>Aliquid autem saepe sit cumque odit nihil eius consectetur impedit accusantium sunt, repudiandae quaerat cum! Esse autem ipsum aliquam, distinctio laborum excepturi facilis fuga vitae atque iusto eligendi, explicabo corporis.</p>
                    <p>Necessitatibus minima quidem fugit corporis reprehenderit saepe facilis perspiciatis sit, consectetur nulla officia, pariatur accusantium quas voluptas. Illum placeat eligendi dolor nihil libero culpa, ex quas voluptas deleniti, unde id.</p>
                  </f7-block>
                </f7-page>
              </f7-pages>
            </f7-view>
          </f7-popup>          
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
    data: function () {
      return {
        inlinePopupOpened: false
      };
    },
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
      },
      openInlinePopup: function () {
        var self = this;
        self.inlinePopupOpened = true;
      },
      closeInlinePopup: function () {
        var self = this;
        self.inlinePopupOpened = false;
      }
    }
  }
</script>
