<template>
    <div class="chat-message">
<div class="user-message">
    <p >用户发送的文本</p>
</div>
<div class="send-image">
<van-image
  width="100px"
  height="100px"
  radius="5"
  fit="cover"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
</div>
<div class="ai-message">
    <div class="mark-text">大模型回复</div>
    <!-- <loading v-if="true"></loading> -->
</div>
<queryTrainTickets></queryTrainTickets>
<weather></weather>
<searchGoods></searchGoods>
<inputArea></inputArea>
</div>
</template>

<script setup>
import loading from '@/page/commponent/loading.vue';
import queryTrainTickets from "@/page/toolComponents/queryTrainTickets.vue"
import weather from '@/page/toolComponents/weather.vue';
import searchGoods from '@/page/toolComponents/searchGoods.vue';
import inputArea from '@/page/commponent/inputArea.vue';
</script>

<style lang="less" scoped>
.chat-message {
    display: flex; /* 使用flex布局 */
    flex-direction: column; /* 垂直排列 */;
    .user-message {
        
        margin-top: 15px;
        max-width:70%; /* 消息框宽度 */;
        align-self:flex-end; /* 右对齐 */;
        opacity: 0.7; /* 消息框透明度 */;
        transform: translateY(20px);
        animation: fadeUp 0.2s ease-in-out forwards; /* 淡入动画 */;    
    
        p{
            font-size: 13px;
            line-height: 1.5;
            background-color: #3a71e8;
            color: #fff;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 5px;
        }
    }
    .send-image {
    display: flex;
    flex-direction: column; /* 垂直排列 */;
     transform: translateY(20px);
    animation: fadeUp 0.2s ease-in-out forwards; /* 淡入动画 */;    
    .van-image {
        align-self: flex-end;
        margin-top: 4px; /* 与用户消息的间距 */;
    }
}
        
   .ai-message {
        margin-top: 15px; /* 与用户消息的间距 */;
        align-self:flex-start; /* 左对齐 */; 
        .mark-text{
        font-size: 13px;
        max-width: 90%;
        word-wrap: break-word;
        line-height: 1.5;
        background-color: #f2f4ff;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #333;
        padding: 5px;
        }
   }
}



@keyframes fadeUp {
    0%  {
        opacity: 0; /* 完全不透明 */;        
        transform: translateY(20px); /* 恢复原始位置 */; 
       }
    100% {
        opacity: 1; /* 完全不透明 */;        
        transform: translateY(0); /* 恢复原始位置 */; 
    }
}
</style>