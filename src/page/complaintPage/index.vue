<template>
    <div style="height: 150px;">
    <van-nav-bar title="投诉" left-arrow fixed placeholder="false"></van-nav-bar>
    <div class="complaint-page">
        <p class="title-text">你要投诉谁</p>
        
<van-field
  v-model="fieldValue"
  is-link
  readonly
  label="投诉"
  placeholder="选择投诉对象"
  @click="showPicker = true"
/>
<van-popup :show="showPicker" round position="bottom">
  <van-picker
    :columns="objectData"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>

    </div>

    <div class="complaint-page">
        <p class="title-text">请告诉我们发生了什么事</p>
        <van-field class="input-text" type="textarea" placeholder="请输入投诉原因"></van-field>
    </div>

    <!-- <div class="complaint-page">
        <p class="title-text">这件事发生在哪里</p>
        
 <van-field
  v-model="fieldValue"
  is-link
  readonly
  label="投诉"
  placeholder="选择投诉地区"
  @click="showPickerCity = true"
 />
 <van-popup v-model:show="showPickerCity" round position="bottom">
  <van-picker
    :columns="objectData"
    @cancel="showPickerCity= false"
  />
 </van-popup>

    </div> -->
    <div class="complaint-page">
        <p class="title-text">你的诉求是</p>
    <van-field class="input-text" type="textarea" placeholder="点击输入"></van-field>
  </div>
    
   <div class="complaint-page">
        <p class="title-text">最后我们需要了解您的个人信息，用于核实事件以及告知</p>
    <van-field  label="你的姓名" placeholder="请输入姓名"></van-field>
    <van-field  type="tel" label="你的联系方式" placeholder="请输入电话号码"></van-field>
    
<van-field
  is-link
  readonly
  v-model="fieldValueTrave"
  placeholder="你在云南是如何旅行的"
  @click="showPickerTrave = true"
/>
    <van-popup :show="showPickerTrave" round position="bottom">
  <van-picker
    :columns="travelMethodData"
    @cancel="showPickerTrave = false"
    @confirm="onConfirmTrave"
  />
</van-popup>


  </div>
  <van-button class="submit-button" type="primary">提交投诉</van-button>
   </div>
</template>

<script setup>
import { ref } from 'vue'
const fieldValue = ref('')
const fieldValueCity= ref('')
const fieldValueTrave= ref('')
const showPicker = ref(false)
const showPickerCity = ref(false)
const showPickerTrave = ref(false)
const travelMethodData = [
     { text: '自由行', value: 'Wenzhou' },
      { text: '更团游', value: 'Shaoxing' },
     

]
const objectData = [
 
     { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
  
]
  const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].text;
};

const onConfirmTrave = ({ selectedOptions }) => {
      showPickerTrave.value = false;
      fieldValueTrave.value = selectedOptions[0].text;
};
</script>

<style lang="less" scoped>
.complaint-page{
    padding: 10px;
    .title-text{
    font-size: 15px;
    font-weight: bold;
    padding: 7px 0;
    color: #333;
   }
   .input-text{
    border-radius: 10px;
   }
}
.submit-button{
    width: 90%;
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
}

</style>