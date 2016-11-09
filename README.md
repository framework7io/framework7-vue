<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>
[![devDependency Status](https://david-dm.org/nolimits4web/framework7-vue/dev-status.svg)](https://david-dm.org/nolimits4web/framework7-vue#info=devDependencies)

# Framework7 + Vue

This plugin provides set of F7 components converted to Vue components, including router and extended F7 API.

To use this plugin include `framework-vue.min.js` script from `dist/` folder to your document in addition to F7 core script and styles and call the following script before you mount the app:

```js
Vue.use(Framework7Vue)
```

And when you init your Vue app you need to pass `framework7` parameter with F7 app parameters to init F7 as well:

```js
var app = new Vue({
    // Root Element
    el: '#app',
    // Framework7 Parameters
    framework7: {
        root: '#app', //Should be same as app el
        animateNavBackIcon: true,
        routes: Routes,
    },
    // Custom App Methods
    methods: {
        //Callback method will be executed after F7 initialization
        onF7Init: function () {
          console.log('f7-init');
        }
    }
});
```

## Kitchen Sink

Install Dependencies
```
$ npm i
```

Start Kitchen Sink:
```
$ npm run dev
```
