# 亮点记录
封装规范 api文件（封装规范） 
后端controller （封装规范）
在设计火车票调用接口时发现接口无鉴权（思考，解决问题）
# 困惑记录
后端路由
router.post('/chatMessage', (ctx) => chat.chatMessage(ctx));一开始的回调函数是直接调用的，然后造成了上下文丢失的问题，导致无法正常工作。但是封装成箭头函数就不会
