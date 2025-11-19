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
                content: '你是云南旅游小助手...'
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
                    const resObj = { type: "content", functionName, data: choice.content };
                    const buffer = Buffer.from(JSON.stringify(resObj))
                    ctx.status = 200;
                    ctx.res.write(buffer);
                }

        }





        console.log("这是下一次调用");
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
        
    }
}

module.exports = new ChatController();