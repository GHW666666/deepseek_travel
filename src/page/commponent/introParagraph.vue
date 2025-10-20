<template>
    <div>
<div class="main-header">
    <div>
        <p class="name-field">Hi,我是云游小助手</p>
        <p class="intro-section">你的江西专属云游助手，可以帮你规划行程和解答出游问题哦</p>
    </div>
    <div >

        <img src="@/assets/猫.jpg" alt="">
    </div>
</div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.main-header {
    display: grid;
    grid-template-columns: repeat(2,1fr); /* 左右各占一半 */
    padding: 15px  ; /* 可选：添加内边距 */
    
img{
   border-radius: 100%; 
   width: 100%;
   height: 100%;
   object-fit: fill; /* 保持图片比例并覆盖整个容器 */
}
.name-field {
    font-size: 17px;
    color: rgb(13, 13, 13);
    padding: 15px;
}
.intro-section {
    font-weight: bold;
    line-height: 2;
}
}

</style>