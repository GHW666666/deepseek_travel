<template>
   <div class="content" ref="contentRef">
    <!-- 顶部区域 -->
     <introParagraph></introParagraph>
    <!-- 底部区域 -->
     <defalultQuestionVue></defalultQuestionVue>
     <chatMessage ref="chatMessageRef" @messages-change="updatePadding"></chatMessage>
     <inputArea @send-message="handleSendMessage"></inputArea>
   </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import introParagraph from '@/page/commponent/introParagraph.vue';
import defalultQuestionVue from '@/page/commponent/defalultQuestion.vue';
import chatMessage from '@/page/commponent/chatMessage.vue';
import inputArea from '@/page/commponent/inputArea.vue';

const chatMessageRef = ref(null);
const contentRef = ref(null);

// const scrollToBottom = () => {
//     console.log('scrollToBottom 被调用');
//     console.log('chatMessageRef:', chatMessageRef.value);
    
//     nextTick(() => {
//         if (chatMessageRef.value) {
//             console.log('开始滚动到底部');
//             const lastElement = chatMessageRef.value.$el.lastElementChild;
//             if (lastElement) {
//                 lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
//                 console.log('使用 scrollIntoView 滚动完成');
//             } else {
//                 console.error('没有找到最后一个元素');
//             }
//         } else {
//             console.error('chatMessageRef 为空');
//         }
//     });
// };

const handleSendMessage = (message) => {
    console.log('handleSendMessage 被调用');
    console.log('接收到的消息:', message);
    console.log('chatMessageRef:', chatMessageRef.value);
    
    if (chatMessageRef.value) {
        console.log('调用 addMessage');
        chatMessageRef.value.addMessage(message);
        scrollToBottom();
    } else {
        console.error('chatMessageRef 为空');
    }
};

const updatePadding = () => {
    if (contentRef.value) {
        const messagesHeight = chatMessageRef.value?.$el?.scrollHeight || 0;
        const padding = Math.max(150, messagesHeight + 200);  // 基于消息高度计算
        
        contentRef.value.style.paddingBottom = `${padding}px`;
    }
};

onMounted(() => {
    updatePadding();
    window.addEventListener('resize', updatePadding);
});

onUnmounted(() => {
    window.removeEventListener('resize', updatePadding);
});
</script>

<style lang="less" scoped>
.content{
   padding: 10px 10px 0 10px; /* 移除固定底部内边距，使用动态调整 */;
}
</style>