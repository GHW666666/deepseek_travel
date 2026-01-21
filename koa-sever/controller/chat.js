const Openai = require('openai');
const openai = new Openai({
    apiKey: 'sk-469e499d83eb4bb3b83d2a1314a4d6da',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
});
const tools = require("@/config/tools");

class ChatController {
    async chatMessage(ctx) {

        const { chatMessage } = ctx.request.body;

        // 验证输入
        if (!chatMessage || !Array.isArray(chatMessage)) {
            throw new Error('chatMessage must be an array');
        }

        let messages = [
            {
                role: 'system',
                content: '你是云南旅游助手，只能回答云南旅游相关的问题。下面是你的默认回复=>你好！我是云南旅游小助手，可以为你提供以下帮助： 1. 查询火车票或动车票信息：如果你需要了解从某地到某地的火车或动车票价、班次等信息，请告诉我出发地、目的地以及出行日期（格式为年-月-日），我将帮你查询。 2. 查询天气情况：如果你想了解某个城市的天气状况，请告诉我具体的城市名称，我会为你获取最新的天气信息。 如果有其他关于云南旅游的问题，也可以随时问我哦！😊'
            },
            ...chatMessage
        ];

        const completion = await openai.chat.completions.create({
            model: 'qwen-plus',
            messages,
            stream: true,
            tools,
        });

        let functionName = '';
        let requireParameters = '';
        let lastMessage = null;

        for await (const chunk of completion) {

            const str = JSON.stringify(chunk);
            const obj = JSON.parse(str);
            const choice = obj.choices[0].delta;

            // console.log(choice.tool_calls);
            if (choice.tool_calls != null) {
                console.log("有工具调用");
                if (messages[messages.length - 1].role !== "assistant") {
                    messages.push({
                        role: "assistant",
                        content: '',
                        tool_calls: []
                    });
                    lastMessage = messages[messages.length - 1];
                    console.log("走到了1 - 添加了assistant消息");
                }
                const toolCalls = choice.tool_calls;
                if (toolCalls && toolCalls.length > 0) {
                    console.log("走到了2 - 检测到工具调用");



                    if (lastMessage.tool_calls.length === 0) {
                        console.log("走到了3 - 添加第一个工具调用");
                        functionName = toolCalls[0].function.name;
                        lastMessage.tool_calls.push(toolCalls[0]);
                    }
                    console.log(choice, "22222222222222")
                    console.log(toolCalls, "11111111111111")
                    // 拼接参数
                    toolCalls.forEach((item) => {
                        if (item.function && item.function.arguments) {
                            requireParameters += item.function.arguments;
                            // console.log("当前参数片段:", item.function.arguments);
                            // console.log("累计参数:", requireParameters);
                        }
                    });




                }
                console.log(obj.choices[0].finish_reason, "33333333")
                
            }
            if (obj.choices[0].finish_reason === "tool_calls") {
                    // console.log("工具名称:", functionName);
                    // console.log("工具参数:", requireParameters);
                    // console.log("消息",messages)
                    const resObj = { type: "function", functionName, data: JSON.parse(requireParameters) };
                    const buffer = Buffer.from(JSON.stringify(resObj))
                    ctx.status = 200;
                    ctx.res.write(buffer);
                }
                //没工具调用
                if(choice.content){
                    const resObj = { type: "content", functionName, data: choice.content.replace(/\*\*/g, '') };
                    const buffer = Buffer.from(JSON.stringify(resObj))
                    ctx.status = 200;
                    ctx.res.write(buffer); 
                }

        }





        // for await (const chunk of completion){
        //      const str= JSON.stringify(chunk);
        //         const obj= JSON.parse(str);
        //         const choice = obj.choices[0].delta;
        //          if(messages[messages.length-1].role!=="assistant"){
        //                 messages.push({
        //                     role: "assistant",
        //                     content: '',
        //                     tool_calls: []
        //                 });
        //                 lastMessage = messages[messages.length - 1];


        //          }
        //             const toolCalls = choice.tool_calls;
        //             if (toolCalls && toolCalls.length > 0) {
        //                 console.log("走到了2 - 检测到工具调用");



        //                 if (lastMessage.tool_calls.length === 0) {
        //                     console.log("走到了3 - 添加第一个工具调用");
        //                     functionName = toolCalls[0].function.name;
        //                     lastMessage.tool_calls.push(toolCalls[0]);
        //                 }
        //                     toolCalls.forEach((item) => {
        //                     if (item.function && item.function.arguments) {
        //                         requireParameters += item.function.arguments;
        //                         // console.log("当前参数片段:", item.function.arguments);
        //                         // console.log("累计参数:", requireParameters);
        //                     }
        //                 });
        // }

        //         // console.log(choice);
        //         console.log(JSON.stringify( choice.tool_calls),'1111111')
        //         console.log("==========================");
        // }
        //     console.log("工具名称:", functionName);
        //     console.log("工具参数:", requireParameters);


    }
    //图片上传
    async uploadFile(ctx) {
        ctx.send(`http://${ctx.host}/${ctx.file.destination}${ctx.file.filename}`)
        console.log(`http://${ctx.host}/${ctx.file.destination}${ctx.file.filename}`)
    }
}

module.exports = new ChatController();