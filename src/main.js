// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import { mixin as focusMixin } from 'vue-focus'

/* eslint-disable no-new */
Vue.use(MintUI)
new Vue({
  mixins: [ focusMixin ],
  el: '#app',
  template: '<App/>',
  components: { App }
})
