<template>
  <div class="flex flex-col items-center justify-center h-full">
    <a :href="miniUrl"> <a-button>打开广告</a-button></a>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "block",
});

const route = useRoute();

let jumpUrl = route.query.jumpUrl
  ? decodeURIComponent(route.query.jumpUrl as string)
  : "";
const miniId = route.query.miniId as string;

const miniUrl = computed(() => {
  return `weixin://dl/business/?t=${miniId}`;
});

onMounted(() => {
  location.replace(miniUrl.value);
});
</script>

<style></style>
