import Vue from 'vue'
import App from './App.vue'
import router from './common/router'
import store from './common/store'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import MyHttpServer from './common/helpers/index'

Vue.use(MintUI);
Vue.use(MyHttpServer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    setRem();
  },
}).$mount('#app')

//设置了rem更好的响应式
function setRem() {
  const whdef = 100 / 1920;// 表示1920的设计图,使用100PX的默认值
  const bodyWidth = document.body.clientWidth;// 当前窗口的宽度
  const rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  document.getElementsByTagName('html')[0].style.fontSize = `${rem}px`;
  console.log(rem);
}
window.addEventListener('load', setRem);
window.addEventListener('resize', setRem);