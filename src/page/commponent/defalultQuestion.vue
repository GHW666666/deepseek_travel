<template>
    <div class="support-agent">
    <img src="@/assets/头像.jpg" alt="">
    <p>云游宝</p>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.support-agent{
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    margin: 10px ; /* 上下间距 */;
    img{
        object-fit: cover; /* 保持图片比例并填充容器 */;
        height: 35px;
        width: 35px; /* 图片宽度 */
        margin-right: 10px; /* 图片与文字之间的间距 */;
    }
    p{
        font-size: 14px;
    }
}
</style>