//引入路由组件
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Search from '../components/pages/Search'
import Detail from '@/components/pages/Detail'
import AddCartSuccess from '@/components/pages/AddCartSuccess'
import ShopCart from '@/components/pages/ShopCart'
import Trade from '@/components/pages/Trade'
import Pay from '@/components/pages/Pay'
import Center from '@/components/pages/Center'
import PaySuccess from '@/components/pages/PaySuccess'

export default [
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        // 路由元信息key不能瞎写：只能叫作meta
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',//为路由传参起的名字
        // 路由组件能不能传递props数据？
        // 布尔值写法:params
        // props:true,
        // 对象写法：额外的给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法：可以params参数、query参数、通过props传递给路由组件
        /* props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        } */
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })

    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: { show: true }
    },
    // 重定向，在项目跑起来时，访问/ 立刻定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]