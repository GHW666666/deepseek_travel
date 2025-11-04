const Openai = require('openai');
const openai=new Openai({
    apiKey:'sk-469e499d83eb4bb3b83d2a1314a4d6da',
    baseURL:'https://dashscope.aliyuncs.com/compatible-mode/v1'
});
const tools=require("@/config/tools")

class ChatController {
    async chatMessage(ctx) {
        // const {chatMessage}=ctx.request.body;
        //  if (!chatMessage || !Array.isArray(chatMessage)) {
        //         console.log(ctx.request.body)
        //         // console.log(chatMessage);
        //         throw new Error('chatMessage must be an array11111');
        // }
        // console.log(ctx.request.body)
        const {chatMessage}=ctx.request.body;
        const completion=await openai.chat.completions.create({
           model:'qwen-plus',
           messages:[
            //  {role:'system',content:'你是云南旅游小助手，名叫云游宝。职责包括协助用户制定云南旅游攻略，推荐景点和美食，提供车票和天气查询服务，进行任意图片理解分析。若用户遇到不公平待遇(如黑导游、购物纠纷等)，建议拨打云南文旅局电话0871-123456投诉(这个电话需要加粗蓝色字体回复)，或点击右下角一键投诉。若用户接问非旅游相关话题，回复:非常抱歉，我现在回答不了这个问题。如果您有关于云南旅游的问题，欢迎随时向我咨询哦!祝您旅途愉快!。其他情况不予回复。"'},
            //  {role:'user',content:'你好'}
            ...chatMessage
        ] ,
           stream:true,
           tools,
        })
        // console.log(JSON.stringify(completion));
        //迭代
         for await (const chunk of completion) {
                ctx.res.write(`data: ${JSON.stringify(chunk)}\n\n`);
            }
        
    } 
}
module.exports = new ChatController();