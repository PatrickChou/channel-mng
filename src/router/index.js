import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const demo1 = r => require.ensure([], () => r(require('../page/demo1')), 'demo1')
const demo2 = r => require.ensure([], () => r(require('../page/demo2')), 'demo2')
const demo3 = r => require.ensure([], () => r(require('../page/demo3')), 'demo3')

const routerConfig = [
     //地址为空时跳转home页面
    {
        path: '/',
        redirect: '/home',
    },
    //登录页
    {
        path: '/login',
        component: login,
        meta: { auth: false, title: '登录' }
    },
    //测试3
    {
        path: '/demo3',
        component: demo3,
        meta: { auth: true, title: '测试3' }
    },
    //主页面
    {
        path: '/home',
        component: home,
        children: [{
                path: '',
                component: demo1
            },
            {
                path: 'index', //首页
                component: demo1,
                meta: { auth: false, title: '首页' }
            },
            {
                path: 'demo2', //贷款申请页
                component: demo2,
                meta: { auth: true, title: '贷款申请页' }
            }
        ]
    },
]

const router = new Router({
    routes: routerConfig,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const {path, name} = to
    if (to.meta.auth) {
      const token = getStore('token')
      store.commit('changeFullPath', to.fullPath)
      if (token && token !== '') {
        next()
      } else if (path !== 'login') {
        next({
          path: '/login',
          query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next()
    }
})

router.afterEach((to, from, next) => {})

export default router