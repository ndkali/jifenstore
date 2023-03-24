const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave: false,//关闭eslintre语法检查
}
// 解决跨域问题
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/cms": {
        target: "http://kumanxuan1.f3322.net:8881/cms", // 当我们发送请求时的URL中有/api时，会将在/api前面的路径替换成target的值。
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {  //重写匹配的字段，如果不想出现在请求路径上，可以重写为""
          "^/cms": ""
        }
      },
    },
  }
}

