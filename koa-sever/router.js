const Router=require('@koa/router');
const router=new Router();

const user=require('@/controller/user');//引入user.js
router.post('/wxLogin',user.wxLogin);//登录接口

//对话接口
const chat=require('@/controller/chat');
router.post('/chatMessage',chat.chatMessage);

module.exports=router;