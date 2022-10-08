import Vue from 'vue'

import App from './App.vue'
//引入路由
import router from '@/router'
//引入vuex $store
import store from './store/index'

// 三级联动组件
import TypeNav from '@/components/TypeNav'
// 轮播图
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'
// element插件
import { Button, MessageBox } from 'element-ui';

// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav) /* ？？？ */
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
//Element ui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 解决element 抖动问题 ======  其实发生该问题的原因非常简单，当弹框出现时，会导致页面的滚动条隐藏，然而关闭弹框时，滚动条又会重新出现，由于滚动条的隐藏和出现，也就导致了页面会抖动的问题。
// import ElementUI from 'element-ui';
// ElementUI.Dialog.props.lockScroll.default = false;

// 引入MockServer.js----mock数据
import '@/mock/mockServe'
// 引包 Swiper/css样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

//统一接口api文件夹里面全部请求区数
import * as API from '@/api'

import atm from '@/assets/loading.gif'

//引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
})

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由 语法：KV一致省略V
  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息:当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多个一个属性$store属性
  store,
}).$mount('#app')
