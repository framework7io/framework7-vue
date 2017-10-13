<template>
  <f7-page>
    <f7-navbar title="Progress Bar" back-link="Back"></f7-navbar>
    <div class="block">
      <p>In addition to <a href="/preloader/">Preloader</a>, Framework7 also comes with fancy animated determinate and infinite/indeterminate progress bars to indicate some activity.</p>
    </div>
    <f7-block-title>Determinate Progress Bar</f7-block-title>
    <div class="block block-strong">
      <p>When progress bar is determinate it indicates how long an operation will take when the percentage complete is detectable.</p>
      <p>Inline determinate progress bar:</p>
      <div>
        <p><span data-progress="10" class="progressbar" id="demo-inline-progressbar"></span></p>
        <p class="segmented segmented-raised">
          <a href="#" data-progress="10" class="button" @click="setInlineProgress(10)">10%</a>
          <a href="#" data-progress="30" class="button" @click="setInlineProgress(30)">30%</a>
          <a href="#" data-progress="50" class="button" @click="setInlineProgress(50)">50%</a>
          <a href="#" data-progress="100" class="button" @click="setInlineProgress(100)">100%</a>
        </p>
      </div>
      <div>
        <p>Inline determinate load & hide:</p>
        <p id="demo-determinate-container"></p>
        <p>
          <a href="" class="button button-raised" @click="showDeterminate(true)">Start Loading</a>
        </p>
      </div>
      <div>
        <p>Overlay with determinate progress bar on top of the app:</p>
        <p>
          <a href="" class="button button-raised" @click="showDeterminate(false)">Start Loading</a>
        </p>
      </div>
    </div>
    <f7-block-title>Infinite Progress Bar</f7-block-title>
    <div class="block block-strong">
      <p>When progress bar is infinite/indeterminate it requests that the user wait while something finishes when it’s not necessary to indicate how long it will take.</p>
      <p>Inline infinite progress bar</p>
      <p>
        <span class="progressbar-infinite"></span>
      </p>
      <p>Multi-color infinite progress bar</p>
      <p>
        <span class="progressbar-infinite color-multi"></span>
      </p>
      <div>
        <p>Overlay with infinite progress bar on top of the app</p>
        <p id="demo-infinite-container"></p>
        <p>
          <a href="" class="button button-raised" @click="showInfinite(false)">Start Loading</a>
        </p>
      </div>
      <div>
        <p>Overlay with infinite multi-color progress bar on top of the app</p>
        <p>
          <a href="" class="button button-raised" @click="showInfinite(true)">Start Loading</a>
        </p>
      </div>
    </div>
    <f7-block-title>Colors</f7-block-title>
    <div class="list simple-list">
      <ul>
        <li>
          <div class="progressbar color-blue" data-progress="10"></div>
        </li>
        <li>
          <div class="progressbar color-red" data-progress="20"></div>
        </li>
        <li>
          <div class="progressbar color-pink" data-progress="30"></div>
        </li>
        <li>
          <div class="progressbar color-purple" data-progress="40"></div>
        </li>
        <li>
          <div class="progressbar color-indigo" data-progress="50"></div>
        </li>
        <li>
          <div class="progressbar color-cyan" data-progress="60"></div>
        </li>
        <li>
          <div class="progressbar color-teal" data-progress="70"></div>
        </li>
        <li>
          <div class="progressbar color-green" data-progress="80"></div>
        </li>
        <li>
          <div class="progressbar color-yellow" data-progress="90"></div>
        </li>
        <li>
          <div class="progressbar color-orange" data-progress="100"></div>
        </li>
      </ul>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
    methods: {
      setInlineProgress: function (value) {
        var self = this;
        var app = self.$f7;
        app.progressbar.set('#demo-inline-progressbar', value);
      },
      showDeterminate: function (inline) {
        var self = this;
        var app = self.$f7;
        if (self.determinateLoading) return;
        self.determinateLoading = true;
        var progressBarEl;
        if (inline) {
          progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
        } else {
          progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
        }
        var progress = 0;
        function simulateLoading() {
          setTimeout(function () {
            var progressBefore = progress;
            progress += Math.random() * 20;
            app.progressbar.set(progressBarEl, progress);
            if (progressBefore < 100) {
              simulateLoading(); //keep "loading"
            }
            else {
              self.determinateLoading = false;
              app.progressbar.hide(progressBarEl); //hide
            }
          }, Math.random() * 200 + 200);
        }
        simulateLoading();
      },
      showInfinite: function (multiColor) {
        var self = this;
        var app = self.$f7;
        if (self.infiniteLoading) return;
        self.infiniteLoading = true;
        if (multiColor) {
          app.progressbar.show('multi');
        } else {
          app.progressbar.show(app.theme === 'md' ? 'yellow' : 'blue');
        }
        setTimeout(function () {
          self.infiniteLoading = false;
          app.progressbar.hide();
        }, 3000);
      }
    },
  }
</script>
