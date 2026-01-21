const Router=require('@koa/router');
const router=new Router();

const user=require('@/controller/user');//引入user.js
router.post('/wxLogin',user.wxLogin);//登录接口

//文件上传接口
const uploadFile=require('@/config/uploadfile');
//对话接口
const chat=require('@/controller/chat');

//投诉接口
const complaint=require('@/controller/complaint');
router.post('/complaint/submit', complaint.submit);  // 提交投诉
router.get('/complaint/list', complaint.list);       // 获取投诉列表
router.post('/complaint/detail', complaint.detail);  // 获取投诉详情
router.post('/complaint/updateStatus', complaint.updateStatus);  // 更新投诉状态


router.post('/chatMessage',chat.chatMessage);
router.post('/uploadFile',uploadFile.single('file'),chat.uploadFile)
module.exports=router;