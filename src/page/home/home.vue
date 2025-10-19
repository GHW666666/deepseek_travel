<template>
   <div>
    <van-button type="primary">主要按钮</van-button>
    <p>nihao</p>
   </div>
   
</template>

<script setup>
function get1() {
   const url = 'www.baidu.com'
   fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'value' })
})
   .then(response => response.json())
   .then(data => { console.log(data) })

}
</script>

<style lang="less" scoped>

</style>