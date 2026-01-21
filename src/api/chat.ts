const API_BASE_URL = 'http://localhost:7000';
import { toolApi } from './tool';

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
                            
                            if (data.functionName === 'trainTickets') {
                                const { departure, destination, date } = data.data;
                                console.log('调用火车票查询API:', departure, destination, date);
                                
                                try {
                                    const result = await toolApi.queryTrainTickets(departure, destination, date);
                                    console.log('火车票查询结果:', result);
                                    
                                    let ticketInfo = '火车票查询结果：\n\n';
                                    
                                    if (result && result.data && result.data.list) {
                                        const tickets = result.data.list;
                                        ticketInfo += `找到 ${tickets.length} 趟火车票：\n\n`;
                                        tickets.forEach((ticket, index) => {
                                            ticketInfo += `${index + 1}. ${ticket.trainno} (${ticket.type})\n`;
                                            ticketInfo += `   ${ticket.departstation} ${ticket.departuretime} → ${ticket.terminalstation} ${ticket.arrivaltime}\n`;
                                            ticketInfo += `   用时：${ticket.costtime}\n`;
                                            
                                            const prices = [];
                                            if (ticket.yz && ticket.yz.price !== '--') prices.push(`硬座 ¥${ticket.yz.price}`);
                                            if (ticket.ze && ticket.ze.price !== '--') prices.push(`二等座 ¥${ticket.ze.price}`);
                                            if (ticket.zy && ticket.zy.price !== '--') prices.push(`一等座 ¥${ticket.zy.price}`);
                                            if (ticket.swz && ticket.swz.price !== '--') prices.push(`商务座 ¥${ticket.swz.price}`);
                                            if (ticket.yw && ticket.yw.price !== '--') prices.push(`硬卧 ¥${ticket.yw.price}`);
                                            if (ticket.rw && ticket.rw.price !== '--') prices.push(`软卧 ¥${ticket.rw.price}`);
                                            
                                            if (prices.length > 0) {
                                                ticketInfo += `   票价：${prices.join('、')}\n`;
                                            }
                                            ticketInfo += '\n';
                                        });
                                    } else {
                                        ticketInfo = '未查询到符合条件的火车票';
                                    }
                                    
                                    if (onChunk) {
                                        onChunk(ticketInfo);
                                    }
                                } catch (error) {
                                    console.error('查询火车票失败:', error);
                                    if (onChunk) {
                                        onChunk('查询火车票失败，请稍后重试');
                                    }
                                }
                            } else if (data.functionName === 'getWeather') {
                                const { city } = data.data;
                                console.log('调用天气查询API:', city);
                                
                                try {
                                    const result = await toolApi.getWeather(city);
                                    console.log('天气查询结果:', result);
                                    
                                    let weatherInfo = `天气查询结果：\n`;
                                    
                                    if (result && result.data) {
                                        const weatherData = result.data;
                                        weatherInfo += `${weatherData.city} ${weatherData.temperature} ${weatherData.weather}\n`;
                                        weatherInfo += `风力：${weatherData.wind}\n`;
                                        weatherInfo += `湿度：${weatherData.humidity}`;
                                    } else {
                                        weatherInfo = '查询天气失败';
                                    }
                                    
                                    if (onChunk) {
                                        onChunk(weatherInfo);
                                    }
                                } catch (error) {
                                    console.error('查询天气失败:', error);
                                    if (onChunk) {
                                        onChunk('查询天气失败，请稍后重试');
                                    }
                                }
                            }
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
