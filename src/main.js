import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './style/index.scss'
import './mock'
import store from './store'
import * as filters from './utils/filters'

// 路由
Vue.use(VueRouter)

// 第三方库 iView
Vue.use(iView);

// 添加全局过滤器
Object.keys(filters).forEach(function (key, index, arr) {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')