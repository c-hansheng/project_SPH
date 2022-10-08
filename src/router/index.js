//配置路由的地方

import Vue from 'vue'
//路由插件 
import VueRouter from "vue-router";
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递参数）
// 第二个参数：成功的回调
// 第二个参数：失败的回调
VueRouter.prototype.push = function (location, resole, reject) {
    if (resole && reject) {
        originPush.call(this, location, resole, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resole, reject) {
    if (resole && reject) {
        originReplace.call(this, location, resole, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 暴露并配置路由
let router = new VueRouter({
    //配置路由
    //第一:路径的前面需要有/(不是二级路由）
    //路径中单词都是小写的
    //component右侧v别给我加单引号【字符串：组件是对象（Vuecomponent类的实例）】
    routes, //将配置路由转移到routes 再引入进来
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 } //v4.0 top:0
    }
})

//全局守卫。前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到那个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next（)放行 next（path)放行到指令路由       next(false):

    let token = store.state.user.token
    let name = store.state.user.userInfo.name

    if (token) {
        //用户已经登陆了还想去login [不能去，停留在首页了
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            // 登录后 有用户名
            if (name) {
                next()
            } else {
                // 没有用户名,重新获取用户信息并跳转
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token 失效，重新登录
                    alert('登录已过期')
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        if (to.path === '/addcartsuccess' || to.path === '/shopCart') {
            next('/login')
        } else {
            next()
        }
    }

})

export default router