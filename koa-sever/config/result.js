//统一接口响应
const   responseHandler = async(ctx, next) => {
  ctx.send=(data=null, code=200, message='success',error=null,serviceCode=200)=>
   { 
    ctx.body = {
    data,
    code,
    message,
    error,
  }
  ctx.status = serviceCode
  }
  
  await next()
}
module.exports = responseHandler