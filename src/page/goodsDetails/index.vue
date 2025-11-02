<template>
    <div>
 <van-nav-bar title="商品详情" left-arrow fixed :placeholder="false"></van-nav-bar>
    <img class="cover-image" src="https://dimg04.c-ctrip.com/images/20010z000000mtr309554_D_769_510_Q100.jpg" alt="">

    <div class="price-and-title">
        <p class="price">199/人</p>
        <p class="title">标题标题标题</p>
    </div>

    <div class="goods--details">
        <p class="goods-describe">产品特色</p>
        <img src="https://dimg04.c-ctrip.com/images/20010z000000mtr309554_D_769_510_Q100.jpg" alt="">
        <img src="https://dimg04.c-ctrip.com/images/20010z000000mtr309554_D_769_510_Q100.jpg" alt="">
        <img src="https://dimg04.c-ctrip.com/images/20010z000000mtr309554_D_769_510_Q100.jpg" alt="">
    </div>
<div class="submit">
    <van-button  type="primary" block >立即报名</van-button>
</div>
    
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
    .cover-image{
        width: 100%;
        max-height: 300px;
        object-fit: cover;
    }
    .price-and-title{
        background-color: #ffffff; 
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        .price{
            color: red;
        }
       .title{
        font-size: 16px;
       }
    }
    .goods--details{
             background-color: #ffffff; 
             margin: 10px;
             padding: 10px;
             border-radius: 10px;
             .goods-describe{
                 padding-bottom: 10px;
                 font-weight: bold;
             }   
             img{
                 width: 100%;
               
             }    
    }
    .submit{
           background-color: #ffffff ;
           position: fixed;
           bottom: 0;
           left: 0;
           right: 0;
           padding: 10px 20px 20px 20px;
    }
 
</style>