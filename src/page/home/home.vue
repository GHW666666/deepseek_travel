<template>
   <div class="content">
    <!-- 顶部区域 -->
     <introParagraph></introParagraph>
    <!-- 底部区域 -->
     <defalultQuestionVue></defalultQuestionVue>
   </div>
</template>

<script setup>
import introParagraph from '@/page/commponent/introParagraph.vue';
import defalultQuestionVue from '@/page/commponent/defalultQuestion.vue';

</script>

<style lang="less" scoped>
.content{
   padding: 0 10px ; /* 可选：添加内边距 */;
}
</style>