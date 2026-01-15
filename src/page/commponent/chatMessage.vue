<template>
  <div class="chat-message">
    <div v-for="(msg, index) in messages" :key="index">
      <div v-if="msg.type === 'user'" class="user-message-container">
        <div class="user-message">
          <p>{{ msg.content }}</p>
        </div>
        <van-image
          class="user-avatar"
          width="40px"
          height="40px"
          radius="50%"
          fit="cover"
          :src="userAvatar"
        />
      </div>
      <div v-if="msg.type === 'ai'" class="ai-message">
        <div class="mark-text">{{ msg.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import loading from "@/page/commponent/loading.vue";
import queryTrainTickets from "@/page/toolComponents/queryTrainTickets.vue";
import weather from "@/page/toolComponents/weather.vue";
import searchGoods from "@/page/toolComponents/searchGoods.vue";
import inputArea from "@/page/commponent/inputArea.vue";
import userAvatar from "@/assets/头像.jpg";

const STORAGE_KEY = 'chat_messages';

const messages = ref([]);

const emit = defineEmits(['messages-change']);

onMounted(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
        try {
            messages.value = JSON.parse(savedMessages);
        } catch (e) {
            console.error('读取历史消息失败:', e);
        }
    }
});

watch(messages, () => {
    emit('messages-change');
});

const addMessage = (message) => {
    console.log('addMessage 被调用');
    console.log('接收到的消息:', message);
    
    if (message.type === 'user') {
        messages.value.push(message);
    } else if (message.type === 'ai') {
        const lastMessage = messages.value[messages.value.length - 1];
        if (lastMessage && lastMessage.type === 'ai') {
            lastMessage.content += message.content;
        } else {
            messages.value.push(message);
        }
    } else if (message.type === 'function') {
        messages.value.push(message);
    }
    
    console.log('当前消息列表:', messages.value);
    saveMessages();
};

const saveMessages = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value));
    } catch (e) {
        console.error('保存消息失败:', e);
    }
};

defineExpose({
    addMessage
});
</script>

<style lang="less" scoped>
.chat-message {
  display: flex;
  flex-direction: column;
  .user-message-container {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 15px;
    gap: 10px;
  }
  .user-message {
    max-width: 70%;
    opacity: 0.7;
    transform: translateY(20px);
    animation: fadeUp 0.2s ease-in-out forwards;

    p {
      font-size: 13px;
      line-height: 1.5;
      background-color: #3a71e8;
      color: #fff;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 5px;
    }
  }
  .user-avatar {
    flex-shrink: 0;
  }

  .ai-message {
    margin-top: 15px;
    align-self: flex-start;
    .mark-text {
      font-size: 13px;
      max-width: 90%;
      word-wrap: break-word;
      line-height: 1.5;
      background-color: #f2f4ff;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      color: #333;
      padding: 5px;
    }
  }

  .function-message {
    margin-top: 15px;
    align-self: flex-start;
    p {
      font-size: 13px;
      background-color: #fff3cd;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      color: #856404;
      padding: 5px;
    }
  }
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>