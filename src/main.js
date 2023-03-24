import Vue from 'vue'

import App from './App.vue'

import VueRouter from 'vue-router'
import router from './router'
import "./assets/css/index.css"

import Vuex from 'vuex'
import store from "./store";

import SlideVerify from 'vue-monoplasty-slide-verify'
Vue.use(SlideVerify)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store

}).$mount('#app')



