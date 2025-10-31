<template>
    <div class="support-agent">
    <img src="@/assets/头像.jpg" alt="">
    <p>云游宝</p>
    </div>
    <div class="customer-service">
        <span>你可以这样问我</span>
        <div class="custome-service-list">
            <img src="@/assets/头像.jpg" alt="">
            <p>你好</p>
        </div>
        
        
    </div>
    <div class="change-section">
    <img src="" alt="">
    <p>换一换</p>
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
.customer-service{
   
    background-color : #ffffff;
    align-items: center; /* 垂直居中 */
    margin: 10px ; /* 上下间距 */; 
    padding: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    span{
        font-size: 14px;
        margin-right: 10px; /* 图片与文字之间的间距 */; 
    }
    .custome-service-list{
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        margin-top: 10px ; /* 上下间距 */; 
        padding: 10px 7px;
        border-radius: 40px;
        background-color: #f2f4ff;
        img{
            object-fit: cover; /* 保持图片比例并填充容器 */;
            height: 35px; 
            width: 35px; /* 图片宽度 */
            margin-right: 10px; /* 图片与文字之间的间距 */;
        }
        p{
            font-size: 14px;
            padding: 0 5px;
        }
    }
}
.change-section{
   display:inline-flex;
   align-items: center; /* 垂直居中 */
   border-radius: 40px;
   padding: 3px 2px;
   background-color: #a8abb0;
   img{
    object-fit: cover; /* 保持图片比例并填充容器 */;
    height: 10px;
    width: 10px; /* 图片宽度 */
   }
   p{
     font-size: 10px; 
     padding: 7px;
     color: #ffffff;
   }
}
</style>