import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueClipboard)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
