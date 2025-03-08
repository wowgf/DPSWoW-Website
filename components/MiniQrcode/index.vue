<template>
  <div class="flex items-center justify-center object-cover w-full h-full aspect-square">
    <img
      v-if="codeUrl"
      :src="codeUrl"
      alt=""
      class="object-cover w-full h-full"
    />
    <span v-else>
      <a-spin />
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
}>();

const codeUrl = ref("");

onMounted(() => {
  if (!codeUrl.value) getQrcode();
});

function getQrcode() {
  service.comm
    .getMiniQRCode({
      path: props.path,
      env_version: import.meta.dev ? "develop" : "release",
    })
    .then((res) => {
      const uint8Array = new Uint8Array(res.data);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      codeUrl.value = url;
    });
}
</script>

<style></style>
