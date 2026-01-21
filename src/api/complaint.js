const API_BASE_URL = 'http://localhost:7000';

export const complaintApi = {
  async submit(complaintData) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaint/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData)
      });

      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('提交投诉失败:', error);
      return { success: false, message: '网络错误，请稍后重试' };
    }
  },

  async getList() {
    try {
      const response = await fetch(`${API_BASE_URL}/complaint/list`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('获取投诉列表失败:', error);
      return { success: false, message: '网络错误，请稍后重试' };
    }
  },

  async getDetail(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaint/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('获取投诉详情失败:', error);
      return { success: false, message: '网络错误，请稍后重试' };
    }
  },

  async updateStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaint/updateStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status })
      });

      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('更新投诉状态失败:', error);
      return { success: false, message: '网络错误，请稍后重试' };
    }
  }
};
