const API_BASE_URL = 'http://localhost:7000';

export const toolApi = {
    // 查询火车票
    async queryTrainTickets(start, end) {
        try {
            const requestBody = { start, end };
            console.log('前端发送火车票查询请求:', {
                url: `${API_BASE_URL}/tool/trainTickets`,
                body: requestBody
            });
            
            const response = await fetch(`${API_BASE_URL}/tool/trainTickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('前端收到火车票查询响应:', data);
            return data;
        } catch (error) {
            console.error('查询火车票失败:', error);
            throw error;
        }
    },

    // 查询天气
    async getWeather(city) {
        try {
            const response = await fetch(`${API_BASE_URL}/tool/weather`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('查询天气失败:', error);
            throw error;
        }
    }
};
