import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
