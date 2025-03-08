<template>
  <div class="rule-card !bg-[#29292C] p-2 w-e-text-container !text-white">
    <div v-if="isRichText" v-html="content" data-slate-editor></div>
    <p v-else>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
const props = defineProps<{
  content: string;
  isRichText?: boolean;
}>();
</script>

<style></style>
