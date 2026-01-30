class ToolController {
    // 查询火车票信息
    async queryTrainTickets(ctx) {
        console.log('========== 查询火车票请求开始 ==========');
        console.log('完整的请求体:', JSON.stringify(ctx.request.body, null, 2));
        console.log('请求头 Content-Type:', ctx.request.headers['content-type']);
        
        const { start, end } = ctx.request.body;
        
        console.log('解构后的参数:', { start, end, startType: typeof start, endType: typeof end });
        
        if (!start || !end) {
            console.log('参数验证失败: 缺少必要参数');
            return ctx.send(null, 400, '出发地和目的地不能为空');
        }
        
        const appCode = 'd80b590aa3ef476dae75934f25168ccf';
        const url = 'https://jmhccx.market.alicloudapi.com/train-query/ticket';
        
        // 过滤掉城市名称中的"市"字
        const cleanDeparture = start.replace(/市/g, '');
        const cleanDestination = end.replace(/市/g, '');
        
        console.log('过滤后的城市名:', { cleanDeparture, cleanDestination });
        
        // 构建multipart/form-data请求体
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        const formData = [
            `--${boundary}`,
            `Content-Disposition: form-data; name="start"`,
            '',
            `"${cleanDeparture}"`,
            `--${boundary}`,
            `Content-Disposition: form-data; name="end"`,
            '',
            `"${cleanDestination}"`,
            `--${boundary}`,
            `Content-Disposition: form-data; name="ishigh"`,
            '',
            `"0"`,
            `--${boundary}--`
        ].join('\r\n');
        
        console.log('请求URL:', url);
        console.log('请求体:', formData);
        console.log('请求头:', {
            'Authorization': `APPCODE ${appCode}`,
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        });
        
        try {
            console.log('开始发送请求...');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `APPCODE ${appCode}`,
                    'Content-Type': `multipart/form-data; boundary=${boundary}`
                },
                body: formData
            });
            
            console.log('响应状态码:', response.status);
            console.log('响应状态文本:', response.statusText);
            
            const data = await response.json();
            console.log('响应数据:', JSON.stringify(data, null, 2));
            
            const result = {
                code: 200,
                data: data,
                msg: '查询成功'
            };
            
            console.log('========== 查询火车票请求结束 ==========');
            return ctx.send(result, 200, '查询成功');
        } catch (error) {
            console.error('查询火车票失败:', error);
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
