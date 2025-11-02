<template>
    <div class="circle-container">
<span class="circle"></span>
<span class="circle"></span>
<span class="circle"></span>
    </div>
    <div></div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.circle-container { 
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */;
   .circle{
    width: 10px; /* 设置圆的宽度 */
    height: 10px; /* 设置圆的高度 */
    background-color: #777a8d; /* 设置背景颜色为蓝色 */
    border-radius: 50%; /* 将元素设置为圆形 */
    margin: 0 5px; /* 在每个圆之间添加一些间距 */
    animation: colorChange 1s linear infinite; /* 应用动画效果 */
   }
   .circle:nth-child(1) { /* 第一个圆 */
    animation-delay: 0s; /* 延迟0秒开始动画 */
   }
   .circle:nth-child(2) { /* 第二个圆 */
    animation-delay: 0.3s; /* 延迟0.2秒开始动画 */
   }
  .circle:nth-child(3) { /* 第三个圆 */
    animation-delay: 0.67s; /* 延迟0.4秒开始动画 */
   }
@keyframes colorChange { /* 定义动画效果 */
    0% { background-color: #777a8d; } /* 初始颜色 */
    30% { background-color: #ffffff; } /* 中间颜色 */
    66% { background-color: #777a8d; } /* 结束颜色 */
   }

}
</style>