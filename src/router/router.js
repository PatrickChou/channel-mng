import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const demo1 = r => require.ensure([], () => r(require('../page/demo1')), 'demo1')
const demo2 = r => require.ensure([], () => r(require('../page/demo2')), 'demo2')

export default ([
    {
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [
            //地址为空时跳转home页面
            {
                path: '',
                redirect: '/home',
            },
            //登录页
            {
                path: '/login',
                component: login,
            },
            //主页面
            {
                path: '/home',
                component: home,
                children: [
                    {
                        path: '', 
                        component: demo1
                    },
                    {
                        path: 'index', //首页
                        component: demo1
                    },
                    {
                        path: 'demo2', //贷款申请页
                        component: demo2
                    }
                ]
            },
        ]
    }
])
