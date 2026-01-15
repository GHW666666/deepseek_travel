const API_BASE_URL = 'http://localhost:7000';

export const chatApi = {
    async sendToBackend(chatMessage, onChunk) {
        try {
            const response = await fetch(`${API_BASE_URL}/chatMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatMessage: chatMessage
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim());

                for (const line of lines) {
                    try {
                        const data = JSON.parse(line);
                        if (data.type === 'content') {
                            fullContent += data.data;
                            if (onChunk) {
                                onChunk(data.data);
                            }
                        } else if (data.type === 'function') {
                            console.log('工具调用:', data.functionName, data.data);
                        }
                    } catch (e) {
                        console.error('解析错误:', e);
                    }
                }
            }

            return fullContent;
        } catch (error) {
            console.error('发送消息失败:', error);
            throw error;
        }
    }
};
