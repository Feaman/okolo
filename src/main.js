import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import BaseService from './services/base'

Vue.use(Vuex)
Vue.config.productionTip = false
BaseService.vuex = store

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
