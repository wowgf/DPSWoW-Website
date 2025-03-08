<template>
  <!-- <div v-html="html"></div> -->
  <iframe :srcdoc="html" class="w-full h-full"></iframe>
</template>

<script setup lang="ts">
import axios from "axios";

definePageMeta({
  layout: "block",
});

const route = useRoute();
const html = ref("");

if (route.query.id) {
  init(route.query.id as string);
}

async function init(id: string) {
  const { result } = await service.userSimcRecord.info(id);

  const data = await axios.get(result.htmlReportUrl).then((res) => {
    return res.data;
  });

  html.value = data;
}
</script>

<style></style>
