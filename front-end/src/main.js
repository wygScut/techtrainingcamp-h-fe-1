import Vue from 'vue'
import App from './App.vue'
import router from './common/router'
import store from './common/store'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

var axios = require('axios')
// 全局注册，这样在其他组件中就能通过 this.$axios 来调用http服务
Vue.prototype.$axios = axios

Vue.use(MintUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
