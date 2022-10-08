// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// start:进度条开始 || done: 进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"


// 1.利用axios对象的方法create，去创建一个axios实例
const request = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径中会出现api
    baseURL:"/mock",
    // 代表请求超时的时间
    timeout:5000,
})

// 请求拦截器 ------ 在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
    // config: 配置对象，对象里有一个属性很重要，header请求头
        // 进度条开始
        nprogress.start()
        
    return config
})

// 相应拦截器 ------ 当服务器手动请求之后，做出响应（相应成功）会执行的
request.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
        // 进度条结束
        nprogress.done()
        return res.data
    },(error)=>{
        // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
        // 进度条结束
        nprogress.done()
    return Promise.reject(new Error('fail'))/* ??? */
})

//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
// 对外暴露
export default request