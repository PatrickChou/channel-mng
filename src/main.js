import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './style/index.scss'
import './mock'
Vue.use(VueRouter)
Vue.use(iView);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')