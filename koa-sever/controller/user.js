class UserController {
      //用户登录
      async wxLogin(ctx, next) {
        const { name,age } = ctx.request.body;
        ctx.send([1,2,3]);
        console.log(name,age);
      }
}
module.exports = new UserController();