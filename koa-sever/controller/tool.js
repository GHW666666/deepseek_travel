const FormData = require('form-data');
const axios = require('axios');

class ToolController {
    // 查询火车票信息
    async queryTrainTickets(ctx) {
        const { departure, destination, date } = ctx.request.body;
        
        console.log('========== 查询火车票请求开始 ==========');
        console.log('接收到的参数:', { departure, destination, date });
        
        if (!departure || !destination || !date) {
            console.log('参数验证失败: 缺少必要参数');
            return ctx.send(null, 400, '出发地、目的地和日期不能为空');
        }
        
        const appCode = 'd80b590aa3ef476dae75934f25168ccf';
        const url = 'https://jmhccx.market.alicloudapi.com/train-query/ticket';
        
        // 过滤掉城市名称中的"市"字
        const cleanDeparture = departure.replace(/市/g, '');
        const cleanDestination = destination.replace(/市/g, '');
        
        console.log('过滤后的城市名:', { cleanDeparture, cleanDestination });
        
        // 使用FormData模拟multipart/form-data格式
        const form = new FormData();
        form.append('start', cleanDeparture);
        form.append('end', cleanDestination);
        form.append('ishigh', '0');
        form.append('date', date);
        
        console.log('请求URL:', url);
        console.log('请求体:', {
            start: cleanDeparture,
            end: cleanDestination,
            ishigh: '0',
            date: date
        });
        console.log('请求头:', {
            'Authorization': `APPCODE ${appCode}`,
            'Content-Type': 'multipart/form-data'
        });
        
        try {
            console.log('开始发送请求...');
            const response = await axios({
                method: 'POST',
                url: url,
                headers: {
                    'Authorization': `APPCODE ${appCode}`,
                    ...form.getHeaders()
                },
                data: form
            });
            
            console.log('响应状态码:', response.status);
            console.log('响应状态文本:', response.statusText);
            console.log('响应头:', response.headers);
            console.log('响应数据:', JSON.stringify(response.data, null, 2));
            
            const result = {
                code: 200,
                data: response.data,
                msg: '查询成功'
            };
            
            console.log('========== 查询火车票请求结束 ==========');
            return ctx.send(result, 200, '查询成功');
        } catch (error) {
            console.error('查询火车票失败:', error);
            if (error.response) {
                console.error('错误响应状态:', error.response.status);
                console.error('错误响应数据:', JSON.stringify(error.response.data, null, 2));
                console.error('错误响应头:', error.response.headers);
            } else if (error.request) {
                console.error('请求已发送但没有收到响应:', error.request);
            } else {
                console.error('请求配置错误:', error.message);
            }
            console.log('========== 查询火车票请求结束（失败） ==========');
            return ctx.send(null, 500, '查询失败', error.message);
        }
    }
    
    // 查询天气信息
    async getWeather(ctx) {
        const { city } = ctx.request.body;
        
        if (!city) {
            return ctx.send(null, 400, '城市名不能为空');
        }
        
        // 暂时返回模拟数据，后续可接入真实天气API
        const weatherData = {
            code: 200,
            data: {
                city: city,
                temperature: '20°C',
                weather: '晴',
                wind: '微风',
                humidity: '60%'
            },
            msg: '查询成功'
        };
        
        console.log('天气查询结果:', weatherData);
        return ctx.send(weatherData, 200, '查询成功');
    }
}

module.exports = new ToolController();
