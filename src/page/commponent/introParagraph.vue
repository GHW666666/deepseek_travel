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

<style lang="less" >

.main-header {
    display: grid;
    grid-template-columns: repeat(2,1fr); /* 左右各占一半 */
    padding: 10px;
    
img {
    border-radius: 50%; /* 关键修改：50%实现完美圆形 */
    width: 150px; /* 建议固定宽高 */        height: 150px;
    object-fit: cover; /* 保持比例并填充容器 */
    margin: 0 auto; /* 水平居中 */        display: block; /* 消除图片下方空白 */
    }
.name-field {
    font-family: "AliMaMa";
    font-size: 16px;
    
    color: rgb(13, 13, 13);
    background: linear-gradient(90deg, #534dff, #6e81ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block; /* 确保渐变生效 */
    padding: 15px;
}
.intro-section {
    font-weight: bold;
    line-height: 2;
}
}

</style>