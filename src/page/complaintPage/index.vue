<template>
  <div>
    <van-nav-bar
      title="投诉"
      left-arrow
      fixed
      placeholder="false"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="complaint-page">
      <p class="title-text">你要投诉谁</p>

      <van-field
        v-model="formData.target"
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
      <van-field
        v-model="formData.reason"
        class="input-text"
        type="textarea"
        placeholder="请输入投诉原因"
      ></van-field>
    </div>

    <div class="complaint-page">
        <p class="title-text">这件事发生在哪里</p>
        
 <van-field
  v-model="formData.location"
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
    @confirm="onConfirmCity"
  />
 </van-popup>

    </div>
    <div class="complaint-page">
      <p class="title-text">你的诉求是</p>
      <van-field
        v-model="formData.demand"
        class="input-text"
        type="textarea"
        placeholder="点击输入"
      ></van-field>
    </div>

    <div class="complaint-page">
      <p class="title-text">
        最后我们需要了解您的个人信息，用于核实事件以及告知
      </p>
      <van-field v-model="formData.name" label="你的姓名" placeholder="请输入姓名"></van-field>
      <van-field
        v-model="formData.phone"
        type="tel"
        label="你的联系方式"
        placeholder="请输入电话号码"
      ></van-field>

      <van-field
        v-model="formData.travelMethod"
        is-link
        readonly
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
     <van-button class="submit-button" type="primary" @click="handleSubmit" :loading="isSubmitting">提交投诉</van-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { complaintApi } from '@/api/complaint';
import { showFailToast, showSuccessToast } from 'vant';

const router = useRouter();
const isSubmitting = ref(false);

const onClickLeft = () => {
  router.push("/");
};

const formData = reactive({
  name: '',
  phone: '',
  target: '',
  reason: '',
  location: '',
  demand: '',
  travelMethod: ''
});

const fieldValue = ref("");
const fieldValueCity = ref("");
const fieldValueTrave = ref("");
const showPicker = ref(false);
const showPickerCity = ref(false);
const showPickerTrave = ref(false);
const travelMethodData = [
  { text: "自由行", value: "自由行" },
  { text: "跟团游", value: "跟团游" },
];
const objectData = [
  { text: "昆明", value: "昆明" },
  { text: "大理", value: "大理" },
  { text: "丽江", value: "丽江" },
  { text: "香格里拉", value: "香格里拉" },
  { text: "西双版纳", value: "西双版纳" },
];

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  formData.target = selectedOptions[0].text;
};

const onConfirmCity = ({ selectedOptions }) => {
  showPickerCity.value = false;
  formData.location = selectedOptions[0].text;
};

const onConfirmTrave = ({ selectedOptions }) => {
  showPickerTrave.value = false;
  formData.travelMethod = selectedOptions[0].text;
};

const handleSubmit = async () => {
  if (!formData.name.trim()) {
    showFailToast('请输入姓名');
    return;
  }
  
  if (!formData.phone.trim()) {
    showFailToast('请输入电话号码');
    return;
  }
  
  if (!formData.target.trim()) {
    showFailToast('请选择投诉对象');
    return;
  }
  
  if (!formData.reason.trim()) {
    showFailToast('请输入投诉原因');
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await complaintApi.submit({
      name: formData.name,
      phone: formData.phone,
      target: formData.target,
      reason: formData.reason,
      location: formData.location,
      demand: formData.demand,
      travelMethod: formData.travelMethod
    });

    if (result.success) {
      showSuccessToast('投诉提交成功');
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      showFailToast(result.message || '提交失败');
    }
  } catch (error) {
    console.error('提交投诉失败:', error);
    showFailToast('网络错误，请稍后重试');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="less" scoped>
.complaint-page {
  padding: 10px;
  .title-text {
    font-size: 15px;
    font-weight: bold;
    padding: 7px 0;
    color: #333;
  }
  .input-text {
    border-radius: 10px;
  }
}
.submit-button {
  width: 100%;
  margin: 30px 0;
  bottom: 30px;
  left: 0;
}
</style>