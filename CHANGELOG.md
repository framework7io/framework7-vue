# Change Log

## [v2.3.0](https://github.com/framework7io/framework7-vue/compare/v2.2.5...v2.3.0) - on May 27, 2018
  * Imporved memory management to reduce memory leaks (thanks to @llaszkie)
  * New `back-link-force` prop support for **f7-navbar** and **f7-nav-left** to force back navigation to url specified in `back-link-url`
  * Minor fixes

## [v2.2.5](https://github.com/framework7io/framework7-vue/compare/v2.2.1...v2.2.5) - on April 29, 2018
  * Range
    * Added `range:changed` event that will be triggered on slide knob release after value change
  * Minor fixes

## [v2.2.1](https://github.com/framework7io/framework7-vue/compare/v2.2.0...v2.2.1) - on April 7, 2018
  * List Index
    * Now it watches for `indexes` prop and autoupdates on prop change
  * List
    * New slots added to **f7-list** components:
      * `before-list` - elements will be inserted before `<ul></ul>` element
      * `list` - elements will be inserted in `<ul></ul>` element
      * `after-list` - elements will be inserted after `<ul></ul>` element
  * Panel
    * Fixed issue with `panel:close` event not being fired

## [v2.2.0](https://github.com/framework7io/framework7-vue/compare/v2.1.2...v2.2.0) - on April 1, 2018
  * New List Index component **f7-list-index** 🎉
  * Range Slider
    * New `draggable-bar` prop (defaults to `true`) that allows to disable value change on range bar click and drag
  * Stepper
    * New `autorepeat` prop that will repeatedly increase/decrease values while you tap and hold plus/minus buttons
    * New `autorepeat-dynamic` prop that will increase autorepeat ratio based on how long you hold the button
    * New `wraps` prop. When enabled, incrementing beyond maximum value sets value to minimum value; likewise, decrementing below minimum value sets value to maximum value
    * Added `.increment()`, `.decrement()`, `.setValue()`, `.getValue()` component methods
  * Photo Browser
    * Added render function props: `renderNavbar`, `renderToolbar`, `renderCaption`, `renderObject`, `renderLazyPhoto`, `renderPhoto`, `renderPage`, `renderPopup`, `renderStandalone`
  * Messages
    * **f7-message** now supports boolean prop `typing` to render (add/remove) typing message in declarative way
  * Router
    * Added support for routable modals that allows to load Vue components as modals (Popup, Login Screen, etc.). To make it work with router the new component `<f7-routable-modals></f7-routable-modals>` must be added as a child of app root element
  * Few minor fixes

## [v2.1.2](https://github.com/framework7io/framework7-vue/compare/v2.0.10...v2.1.2) - on March 18, 2018
  * New Stepper component  🎉
  * Fab
    * Fixed error about wrong `href` prop
  * Button
    * Added `disabled` prop
  * Minor fixes

## [v2.0.10](https://github.com/framework7io/framework7-vue/compare/v2.0.7...v2.0.10) - on February 19, 2018
  * Messagebar
    * Fixed issue with textarea reference
  * Navbar
    * Improved auto size recalculation on update
  * Swiper
    * New `before-wrapper` and `after-wrapper` slots on **f7-swiper**
  * Button
    * `href` attribute now accepts boolean `false` to remove `href` attribute
  * Link
    * `href` attribute now accepts boolean `false` to remove `href` attribute
  * List
    * New `before-title` and `after-title` slots on **f7-list-item**
  * Fab
    * Added `href` prop for **f7-fab** to set href attribute on main fab link
  * Minor fixes

## [v2.0.7](https://github.com/framework7io/framework7-vue/compare/v2.0.0...v2.0.7) - on January 27, 2018
  * Panel
    * Added `panel:swipeopen` event support
  * Sortable
    * New `sortable-enabled` prop on **f7-list** to enable/disable sortable
  * Navbar
    * New `no-hairline` prop to disable visual Navbar hairline
  * Toolbar
    * Added `no-hairline` prop to disable visual Toolbar hairline
    * Added `inner` prop to enable/disable additional inner `toolbar-inner` element
  * List
    * `media` prop of *f7-list-item* now means media image URL
  * Messages
    * Added `text` slot for *f7-message*
  * Vue component prototype extended with `$request` and `$utils` Framework7 helpers
  * Minor fixes

## [v2.0.0](https://github.com/framework7io/framework7-vue/compare/v0.9.4...v2.0.0) - on January 10, 2018 🎉

## [v2.0.0-beta.6](https://github.com/framework7io/framework7-vue/compare/v2.0.0-beta.5...v2.0.0-beta.6) - on January 8, 2018
  * New Searchbar component
  * New Popup component
  * New Action Sheet component
  * New Sheet component
  * New Login Screen component
  * New Photo Browser component
  * Improved lookup for `$f7router` component prop
  * New `f7RouteChange` and `f7RouteChanged` components methods support to watch for route change(d) events
  * Main esm module now exports `Framework7Vue` plugin with default export and all components as named exports
  * Lot of new/v2-reworked Kitchen Sink demos
  * Lots of minor fixes

## [v2.0.0-beta.5](https://github.com/framework7io/framework7-vue/compare/v2.0.0-beta.4...v2.0.0-beta.5) - on November 8, 2017
  * **f7-panel** now also triggers `panel:breakpoint` event when panel visibility changes based on breakpoint

## [v2.0.0-beta.4](https://github.com/framework7io/framework7-vue/compare/v2.0.0-beta.3...v2.0.0-beta.4) - on October 26, 2017
  * New Messagebar component with the new following components: **f7-messagebar**, **f7-messagebar-attachments**, **f7-messagebar-attachment**, **f7-messagebar-sheet**, **f7-messagebar-sheet-item**, **f7-messagebar-sheet-image**
  * New Messages component with the new following components: **f7-messages**, **f7-message**, **f7-messages-title**
  * Lots of minor fixes

## [v2.0.0-beta.3](https://github.com/framework7io/framework7-vue/compare/v2.0.0-beta.2...v2.0.0-beta.3) - on October 13, 2017
  * Minor fixes

## [v2.0.0-beta.2](https://github.com/framework7io/framework7-vue/compare/v2.0.0-beta.1...v2.0.0-beta.2) - on October 11, 2017
  * Included ES module bundle build (with all components registered) in `framework7-vue.esm.bundle.js`
  * UMD build now also is a bundle version wit all components registered
  * All components now accept color props `color`, `color-theme`, `text-color`, `bg-color`, `border-color`
  * Added color directives `v-f7-color`, `v-f7-color-theme`, `v-f7-text-color`, `v-f7-bg-color`, `v-f7-border-color`
  * Improved ES-modue structure for better tree-shaking
  * `input-value` and `input-name` props on **f7-list-item** renamed to just `value` and `name`
  * Added *f7-panel* component
  * Minor fixes

## v2.0.0-beta.1 - on October 9, 2017
  * Initial v2 beta release
