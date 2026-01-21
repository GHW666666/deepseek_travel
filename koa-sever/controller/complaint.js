const pool = require('@/config/db');

class ComplaintController {
  async submit(ctx) {
    const { 
      name, 
      phone, 
      target, 
      reason, 
      location, 
      demand, 
      travelMethod 
    } = ctx.request.body;

    if (!name || !phone || !target || !reason) {
      return ctx.send(null, 400, '姓名、电话、投诉对象和投诉原因不能为空');
    }

    try {
      const [result] = await pool.execute(
        `INSERT INTO complaints (
          name, phone, target, reason, location, demand, travel_method, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, phone, target, reason, location || '', demand || '', travelMethod || '', 0]
      );

      ctx.send({ complaintId: result.insertId }, 200, '投诉提交成功');
    } catch (error) {
      console.error('提交投诉失败:', error);
      ctx.send(null, 500, '服务器内部错误', error.message);
    }
  }

  async list(ctx) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, phone, target, reason, location, demand, travel_method, status, create_time FROM complaints ORDER BY create_time DESC'
      );
      ctx.send(rows, 200, '获取成功');
    } catch (error) {
      console.error('获取投诉列表失败:', error);
      ctx.send(null, 500, '服务器内部错误', error.message);
    }
  }

  async detail(ctx) {
    const { id } = ctx.request.body;

    try {
      const [rows] = await pool.execute('SELECT * FROM complaints WHERE id = ?', [id]);
      if (rows.length === 0) {
        return ctx.send(null, 404, '投诉不存在');
      }
      ctx.send(rows[0], 200, '获取成功');
    } catch (error) {
      console.error('获取投诉详情失败:', error);
      ctx.send(null, 500, '服务器内部错误', error.message);
    }
  }

  async updateStatus(ctx) {
    const { id, status } = ctx.request.body;

    try {
      const [result] = await pool.execute(
        'UPDATE complaints SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        return ctx.send(null, 404, '投诉不存在');
      }

      ctx.send({ affectedRows: result.affectedRows }, 200, '状态更新成功');
    } catch (error) {
      console.error('更新投诉状态失败:', error);
      ctx.send(null, 500, '服务器内部错误', error.message);
    }
  }
}

module.exports = new ComplaintController();
