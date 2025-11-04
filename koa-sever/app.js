const Koa=require('koa');
const app=new Koa();
const json=require('koa-json');//将http请求的body解析为json格式
const bodyParser=require('koa-bodyparser');//解析post请求的body
const cors=require('@koa/cors');//解决跨域问题
const { addAliases } = require('module-alias');//解决路径问题
addAliases({
    '@': __dirname, // 根目录别名

})
const router=require("./router");//创建路由实例
const responseHandler = require('@/config/result');//引入响应中间件
const errorHandler = require('@/config/errorhandler');//引入错误中间件
//中间件

app.use(cors());//解决跨域问题
app.use(json());//将http请求的body解析为json格式
app.use(bodyParser());//解析post请求的body

app.use(errorHandler);//使用错误中间件
app.use(responseHandler);//使用响应中间件
app.use(router.routes()).use(router.allowedMethods());//使用路由
app.listen(7000,()=>{
console.log('服务器启动成功');
})
