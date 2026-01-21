<template>
    <div>
        <div style=" margin: 5px;"></div>
        <div class="result-item" v-for="(item, index) in ticketList" :key="index">
        <div>
            <p class="query-time">{{ item.departuretime }}</p>
            <p class="station-name">{{ item.departstation }}</p>
        </div>
        <div class="train-run-number">
            <p>{{ item.costtime }}</p>
            <p>{{ item.trainno }}</p>
        </div>
        <div>
             <p class="query-time">{{ item.arrivaltime }}</p>
            <p class="station-name">{{ item.terminalstation }}</p>
        </div>
        <div>
            <p class="production-price">¥{{ getLowestPrice(item) }}</p>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const ticketList = ref([]);

const getLowestPrice = (item) => {
    const seatTypes = ['yz', 'wz', 'rw', 'ze', 'swz', 'yw', 'zy'];
    let lowestPrice = null;
    
    for (const seat of seatTypes) {
        if (item[seat] && item[seat].price !== '--') {
            const price = parseFloat(item[seat].price);
            if (lowestPrice === null || price < lowestPrice) {
                lowestPrice = price;
            }
        }
    }
    
    return lowestPrice !== null ? lowestPrice : '--';
};

const loadTickets = (data) => {
    if (data && data.list) {
        ticketList.value = data.list;
    }
};

defineExpose({
    loadTickets
});
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