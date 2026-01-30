const Openai = require('openai');
const openai = new Openai({
    apiKey: 'sk-469e499d83eb4bb3b83d2a1314a4d6da',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
});
const tools = require("@/config/tools");

class ChatController {
    // 聊天消息处理
    async chatMessage(ctx) {
        const { chatMessage } = ctx.request.body;

        // 验证输入
        if (!chatMessage || !Array.isArray(chatMessage)) {
            throw new Error('chatMessage must be an array');
        }

        let messages = [
            {
                role: 'system',
                content: '你是云南旅游助手'
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

            if (choice.tool_calls !== null) {
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
                    toolCalls.forEach((item) => {
                        if (item.function && item.function.arguments) {
                            requireParameters += item.function.arguments;
                        }
                    });
                }
            }

            if (obj.choices[0].finish_reason === "tool_calls") {
                console.log("工具名称:", functionName);
                console.log("工具参数字符串:", requireParameters);
                console.log("工具参数类型:", typeof requireParameters);
                
                let parsedData;
                try {
                    parsedData = JSON.parse(requireParameters);
                    console.log("解析后的参数:", JSON.stringify(parsedData, null, 2));
                } catch (e) {
                    console.error("解析参数失败:", e);
                    console.error("原始参数字符串:", requireParameters);
                }
                
                const resObj = { type: "function", functionName, data: parsedData };
                console.log("发送给前端的数据:", JSON.stringify(resObj, null, 2));
                const buffer = Buffer.from(JSON.stringify(resObj) + '\n');
                ctx.status = 200;
                ctx.res.write(buffer);
            }

            if (choice.content) {
                const resObj = { type: "content", data: choice.content.replace(/\*\*/g, '') };
                const buffer = Buffer.from(JSON.stringify(resObj) + '\n');
                ctx.status = 200;
                ctx.res.write(buffer);
            }
        }
    }

    // 图片上传
    async uploadFile(ctx) {
        ctx.send(`http://${ctx.host}/${ctx.file.destination}${ctx.file.filename}`);
        console.log(`http://${ctx.host}/${ctx.file.destination}${ctx.file.filename}`);
    }
}

module.exports = new ChatController();
