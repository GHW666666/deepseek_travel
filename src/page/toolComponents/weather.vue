<template>
    <div style=" height: 5px;"></div>
    <div class="weather-content">
<div class="weather-item">
    
    <div class="day-time">11/09</div>
    
    <div class="day-weather">
    <img src="@/assets/头像.jpg" alt="">
    <p>晴天</p>
    </div>
    
    <div class="temperature">12-18℃</div>
</div>
<div class="weather-item">
    
    <div class="day-time">11/09</div>
    
    <div class="day-weather">
    <img src="@/assets/头像.jpg" alt="">
    <p>晴天</p>
    </div>
    
    <div class="temperature">12-18℃</div>
</div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.weather-content {
  background:linear-gradient(to bottom left,#2c305b , #6b6f91 );
  color: #ffffff;
  border-radius: 4px;
  .weather-item{
  display: flex; /* 使用flex布局 */;
  align-items: center; /* 垂直居中 */;
  justify-content: space-around; /* 左右两端对齐 */;
  font-size: 15px;
  padding: 6px; /* 内边距 */;
  }
  .day-time{
  flex: 1; /* 占据剩余空间 */;
  }
 .day-weather{
    flex: 1; /* 占据剩余空间 */;
    display: flex;
    align-items: center; /* 垂直居中 */
    p{
     padding-left: 8px; /* 图片与文本之间的间距 */;
    }
  img{
    width: 30px; /* 调整图片大小 */;
    height: 30px; /* 调整图片大小 */;
    margin-right: 5px; /* 图片与文本之间的间距 */;
  } 
 }
.temperature{
  flex: 1; /* 占据剩余空间 */;
  text-align: right; /* 右对齐 */;
}
}
</style>