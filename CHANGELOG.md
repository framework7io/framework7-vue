# Change Log

## Framework7 Vue v0.8.5 - Updated on March 1, 2017
  * Fixed some issue with `v-model` on form inputs
  * Fixed issues with click events on checkboxes
  * Minor fixes

## Framework7 Vue v0.8.4 - Updated on February 18, 2017
  * Fixed `link-animate-pages` property to accept and render correct value
  * Fixed `$router` prop to point to the parent's `view.router` method
  
## Framework7 Vue v0.8.3 - Updated on February 11, 2017
  * Added `animated` parameter to `open(animated)`, `close(animated)` methods of Popup, Login Screen, Picker Modal, Panel, Action Sheet, Popover components
  * Added `animated` parameter to Tab's component `show(animated)` method
  * Added `animated` parameter to Tab's component `show(animated)`, `hide(animated)` Navbar/Toolbar methods
  * Added `animated` parameter to Tab's component `show(animated)`, `hide(animated)` Navbar/Toolbar methods
  * Added `virtual-empty-template` parameter to **f7-list** component to specify virtual list empty template
  * Added `panel:swipe` event support for **f7-panel** component

## Framework7 Vue v0.8.2 - Updated on February 10, 2017
  * $route params are passed as a component props for pages and tabs

## Framework7 Vue v0.8.1 - Updated on February 10, 2017
  * Added boolean `tablet-inset` prop to **f7-block** and **f7-list** components
  * Added `panel:overlay-click` event support for **f7-panel** component
  * Fixed multiple click issue on list item used as a checkbox or radio input
  * Minor fixes

## Framework7 Vue v0.8.0 - Updated on February 7, 2017
  * Totally reworked F7-Vue router to separate reusable module (huge thanks to [Ben Compton](https://github.com/bencompton))
    * All components now has supports additional `onRouteChange` method that will be triggered on route change
    * Added support for nested routes with Tabs where each tab may have own route and be rendered on demand
  * Added `back-click` event for **f7-navbar** and **f7-nav-left** that will be fired when back link is clicked
  * Added support for "file" input (`<f7-input type="file">`)
  * Minor fixes

## Framework7 Vue v0.7.8 - Updated on January 31, 2017
  * Support v-model for custom f7-inputs
  * Added `back-link-url` prop for **f7-navbar** and **f7-nav-left** components
  * Messagebar
    * `send-link` prop now supports string to pass custom inner HTML
    * New `send-link` slot name to put custom HTML to send link
  * Added `name` prop for **f7-view** component
  * Added `close-speed-dial` prop for **f7-fab-action** to close speed dial on click
  * Added `overlay` prop for **f7-picker-modal** to render additional picker modal overlay when required
  * Added `store-data` prop for **f7-list** when used as a form to enable form data storage
  * Minor fixes

## Framework7 Vue v0.7.7 - Updated on January 13, 2017
  * Some events added to **f7-input** component
    * `keypress`
    * `keyup`
    * `keydown`
    * `beforeinput`
    * `compositionstart`
    * `compositionupdate`
    * `compositionend`
    * `focusin`
    * `focusout`
    * `dblclick`
    * `mousedown`
    * `mouseenter`
    * `mouseleave`
    * `mousemove`
    * `mouseout`
    * `mouseover`
    * `mouseup`
    * `wheel`
    * `select`
  * Added `pattern` attribute to **f7-input** component
  * Added Virutal List events:
    * `virtual:itemsbeforeinsert`
    * `virtual:itemsafterinsert`
    * `virtual:itembeforeinsert`
    * `virtual:beforeclear`
  * Minor fixes

## Framework7 Vue v0.7.6 - Updated on January 10, 2017
  * Fixed issue when page could loaded twice on fast link tap
  * Renamed components methods & props to prevent conflicts with same name props:
    * Search Bar:
      * .clear() -> .empty()
      * `clear` property renamed to `clear-button`. `clear` is still supported
    * Messagebar:
      * .value(newValue) -> .getValue() and .setValue(newValue)
    * Messages:
      * .scrollMessages() -> .scroll()
    

## Framework7 Vue v0.7.5 - Updated on January 9, 2017
  * Added methods for many components:
    * Popup, Login Screen, Picker Modal, Panel, Action Sheet, Popover:
      * .open() - open modal/panel
      * .close() - open modal/panel
    * Navbar, Toolbar:
      * .hide() - hide navbar/toolbar
      * .show() - show navbar/toolbar
      * .size() - size navbar
    * Progress bar:
      * .set(progress, duration) - set progress bar progress
      * .show(container, progress, color) - show progress bar in specified container
    * Tab
      * .show() - show tab
    * Search Bar:
      * .search(query) - Force searchbar to search passed query
      * .enable() - Enable/activate searchbar
      * .disable() - Disable/deactivate searchbar
      * .clear() - Clear search query and update results
    * Message Bar:
      * .value(newValue) - Set messagebar textarea value/text. Or return messagebar textarea value if newValue is not specified
      * .clear() - Clear textarea and update/reset its size
    * Messages:
      * .addMessage(messageParameters, method, animate) - Add new message to the end or to the beginning depending on method parameter
      * .appendMessage(messageParameters, animate) - Add new message to the end (to the bottom)
      * .prependMessage(messageParameters, animate) - Add new message to the beginning (to the top)
      * .addMessages(messages, method, animate) - Add multiple messages per once
      * .removeMessage(message) - Remove message
      * .removeMessages(messages) - Remove multiple messages
      * .scrollMessages() - Scroll messages to top/bottom depending on newMessagesFirst parameter
      * .layout() - Apply messages auto layout
      * .clean() - Clean/remove all the messages
  * Added `start` and `end` slots for Message (f7-message) component
  * New boolean `hidden` prop for Navbar and Toolbar
  * Fixed issues with infinite scroll not being working when specified as boolean attribute, e.g. just `infinite-scroll`
  * New `input` attributes to match native attributes `autocorrect`, `autocapitalize`, `spellcheck`
  * New `link-target` attribute for List Item components to specify link's target attribute
  * Fixed issues with openinig/closing modals (Popup, Login Screen, Picker, Actions) that stopped working after first open/close
  * Minor fixes