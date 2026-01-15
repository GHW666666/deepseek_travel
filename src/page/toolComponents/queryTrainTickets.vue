<template>
    <div>
        <div style=" margin: 5px;"></div>
        <div class="result-item">
        <div>
            <p class="query-time">9.00</p>
            <p class="station-name">昆明</p>
        </div>
        <div class="train-run-number">
            <p>2小时30分</p>
            <p>D7689</p>
        </div>
        <div>
             <p class="query-time">10.00</p>
            <p class="station-name">丽江</p>
        </div>
        <div>
            <p class="production-price">¥123</p>
        </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.result-item {
    display: flex;
    align-items: center;
    justify-content: space-between; // 改为space-between或space-around
    background-color: aliceblue;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 5px;
    .query-time{
    font-weight: bold;
    font-size: 16px;
    color: #333;
 
    }
    .station-name{
    font-weight: bold;
    font-size: 14px;
    color: #333;
 
    }
   .train-run-number{
      p{
        font-size: 13px;
        color: #666697;
      } 
   }

  .production-price{
    font-size: 15px;
    font-weight: bold;
    color: #006ff6;
    margin: 5px; 
  }
}
</style>