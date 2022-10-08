const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports={
  //关闭eslint
  lintOnSave:false,
  // 配置代理跨域 webpack
  devServer:{
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn",
        // target:"http://atguigu.cn/",
      },
    },
  },
}