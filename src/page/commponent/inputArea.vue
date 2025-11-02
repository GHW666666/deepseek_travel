<template>
    <div class="input-container">
    <van-uploader v-model="fileList" :max-count="1" preview-size="60" disabled/>
        <div class="data-query">
            <van-button size="small" type="default">查询火车票</van-button>
             <van-button size="small" type="default">查询天气</van-button>
             <van-uploader>
                 <van-button size="small"  type="default">上传文件</van-button>
             </van-uploader>
              <van-button size="small" type="default">一键投诉</van-button>
        </div>
        
        <div class="input-box-area">
            <img src="" alt="">
            <van-field class="input-content" type="textarea" placeholder="请输入询问内容" :border="false"></van-field>
            <van-button class="send-button" size="small" type="default">发送</van-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const fileList = ref([{url:"https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"}]);
</script>

<style lang="less" scoped>
.input-container {
    position: fixed;
    bottom: 0; /* 固定在底部 */;
    left: 0; /* 固定在左侧 */;
    right: 0;
    .data-query {
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