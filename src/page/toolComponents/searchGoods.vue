<template>
    <div class="goods-content">
    <p class="title">为你推荐以下相关的旅行套餐，官方严选</p>
    <div class="goods-list">
        <div class="goods-item">
            <img src="@/assets/头像.jpg" alt="">
            <p class="goods-title text-show">标题00000000000000000000000000</p>
            <p class="goods-price">价格</p>
        </div>
        <div class="goods-item">
            <img src="@/assets/头像.jpg" alt="">
            <p class="goods-title text-show">标题</p>
            <p class="goods-price">价格</p>
        </div>
        
    </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.goods-content {
    background-color: #ffffff; /* 白色背景 */
    border-radius: 4px ; /* 圆角边框 */ 
    padding: 10px; /* 内边距 */
    .title{
        color: darkorchid; /* 标题颜色 */
        font-weight: bold; /* 标题字体加粗 */
        font-size: 14px; /* 标题字体大小 */
    } 
    .goods-list {
       overflow-x: auto; /* 允许垂直滚动 */ 
       display: flex; /* 使用flex布局 */;
       gap: 10px; /* 项目之间的间距 */;
       padding-top: 5px; /* 顶部内边距 */;
       .goods-item {
        width: 130px; /* 项目宽度 */;
        background-color: #f2f4ff; /* 项目背景颜色 */;
        border-radius: 4px; /* 项目圆角边框 */;
        padding: 10px; /* 项目内边距 */;
        display: flex; /* 使用flex布局 */;
        flex-direction: column; /* 垂直布局 */;
        flex-shrink: 0; /* 禁止项目缩小 */;
        img {
            width: 100%; /* 图片宽度 */;
            height: 100px; /* 图片高度 */;
            object-fit: cover; /* 图片填充 */;
            border-radius: 4px; /* 图片圆角边框 */;
        }
        .goods-title {
            font-size: 14px; /* 标题字体大小 */;
            font-weight: bold; /* 标题字体加粗 */;
            margin-top: 5px; /* 标题上边距 */;
            line-height: 1.4; /* 标题行高 */;
        }
       .goods-price {
        margin-top: auto ;
        color: red;

       }
       }
    }
}
</style>