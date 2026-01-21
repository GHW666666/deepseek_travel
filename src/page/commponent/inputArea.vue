<template>
    <div class="input-container">
    <van-uploader v-model="fileList" :max-count="1" preview-size="60" disabled/>
        <div class="data-query">
            <van-button size="small" type="default">查询火车票</van-button>
             <van-button size="small" type="default">查询天气</van-button>
             <van-uploader>
                 <van-button size="small"  type="default">上传文件</van-button>
             </van-uploader>
              <van-button size="small" type="default" @click="goToComplaintPage">一键投诉</van-button>
        </div>
        
        <div class="input-box-area">
            <van-field v-model="inputText" class="input-content" type="textarea" placeholder="请输入询问内容" :border="false"></van-field>
            <van-button class="send-button" size="small" type="default" @click="sendMessage">发送</van-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { chatApi } from '@/api/chat';

const emit = defineEmits(['send-message']);

const router = useRouter();
const fileList = ref([]);
const inputText = ref('');

const goToComplaintPage = () => {
    router.push('/complaintPage');
};

const sendMessage = async () => {  
    if (!inputText.value.trim()) {

        return;
    }

    const message = inputText.value;
    inputText.value = '';
    emit('send-message', { type: 'user', content: message });
    try {
        console.log('开始发送消息到后端...');
        await chatApi.sendToBackend(
            [
                {
                    role: 'user',
                    content: message
                }
            ],
            (chunk) => {
                console.log('接收到流式数据块:', chunk);
                emit('send-message', { type: 'ai', content: chunk });
                console.log('AI消息块已发送到前端');
            }
        );
        console.log('流式数据发送完成');
    } catch (error) {
        console.error('发送消息到后端失败:', error);
    }
};
</script>

<style lang="less" scoped>
.input-container {
    position: fixed;
    bottom: 0; /* 固定在底部 */;
    left: 0; /* 固定在左侧 */;
    right: 0;
    .data-query {
        font-weight: bold;
        display: flex; /* 使用flex布局 */;
        align-items: center; /* 垂直居中 */;
        padding: 10px; /* 内边距 */;
       
    }
    .van-button {
       margin-left: 15px; 

    }
    .input-box-area {
       display: flex;
       align-items: center; /* 垂直居中 */; 
       background-color: #ffffff;
        border-radius: 5px; /* 圆角 */
       img{
        width: 30px; /* 调整图片大小 */;
        height: 30px; /* 调整图片大小 */;
        margin:0px 5px; /* 图片与文本之间的间距 */;
       }
       .input-content{
        background-color: #f8f9fd;
        flex: 1; /* 占据剩余空间 */;
        border-radius: 10px; /* 圆角 */
        padding: 10px; /* 内边距 */ ;
       
       }
       .send-button{
        border: none; /* 移除边框 */;
        color: #3a71e8;
        font-weight: bold; /* 加粗字体 */;
       }
    }

}
</style>