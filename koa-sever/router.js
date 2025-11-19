const Router=require('@koa/router');
const router=new Router();

const user=require('@/controller/user');//引入user.js
router.post('/wxLogin',user.wxLogin);//登录接口

//文件上传接口
const uploadFile=require('@/config/uploadfile');
//对话接口
const chat=require('@/controller/chat');




router.post('/chatMessage',chat.chatMessage);
router.post('/uploadFile',uploadFile.single('file'),chat.uploadFile)
module.exports=router;