const API_BASE_URL = 'http://localhost:7000';

export const toolApi = {
    // 查询火车票
    async queryTrainTickets(departure, destination, date) {
        try {
            const response = await fetch(`${API_BASE_URL}/tool/trainTickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    departure,
                    destination,
                    date
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
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
