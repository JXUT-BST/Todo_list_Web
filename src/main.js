import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

import jquery from 'jquery'

axios.defaults.headers.post["Content-type"] = "application/json";
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App),
  axios: axios,
  $: jquery
}).$mount('#app')
