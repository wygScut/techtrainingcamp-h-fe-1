import Vue from 'vue'
import App from './App.vue'
import router from './common/router'
import store from './common/store'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);

var axios = require('axios')
axios.default.baseURl = 'https://af6g9a.fn.thelarkcloud.com'
axios.default.withCredentials = true
Vue.prototype.$axios = axios

Vue.use(MintUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
