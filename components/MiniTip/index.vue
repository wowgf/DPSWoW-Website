<template>
  <div
    v-if="showTip"
    class="fixed bottom-0 z-20 w-full p-3 text-center text-slate-900 bg-themeYellow mini-tip"
    @click="openMiniProgram"
  >
    <span>点击此处，打开</span>
    <span class="text-themeRed">小程序</span>
    <span>，享受更佳体验</span>
    <!-- <icon-close
      class="absolute text-gray-100 right-3"
      @click.stop="showTip = false"
    /> -->
  </div>
</template>

<script setup lang="ts">
const miniUrl = ref<string>("");
const showTip = ref(false);

service.comm.getMiniURLScheme({ path: "/pages/index/home" }).then((res) => {
  miniUrl.value = res.openlink;
  showTip.value = true;
});

function openMiniProgram() {
  window.location.href = miniUrl.value;
}
</script>

<style></style>
