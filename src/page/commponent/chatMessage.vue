<template>
    <div class="chat-message">

    <p class="user-message">用户发送的文本</p>

<van-image
  width="100px"
  height="100px"
  radius="5"
  fit="cover"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>

</div>
</template>

<script setup>

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
        animation: fadeUp 0.2s ease-in-out forwards; /* 淡入动画 */;     }
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