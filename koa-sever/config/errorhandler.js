//捕获错误的中间件
const errorHandler = async(ctx, next) => {
  try {
    await next()
  } catch (errorData) {
    ctx.body = {
     msg:"服务器内部错误",
     error:errorData.message || "未知错误", 
    }
    ctx.status = errorData.status  || errorData.statusCode || 500
  }

}
module.exports = errorHandler