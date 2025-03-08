<template>
  <ShareTooltip
    :path="pageUrl"
    :mini-path="miniPage"
    :autoShow="autoShow"
    :auto-show-countdown="3000"
    trigger="hover"
  >
    <button
      class="px-4 py-[10px] bg-green-700 hover:bg-green-600 text-white font-medium rounded border-2 border-green-500 transition-colors duration-200 gap-1"
    >
      <icon-share-alt /> 分享给好友
    </button>
  </ShareTooltip>
</template>

<script setup lang="ts">
import ShareTooltip from "~/components/ShareTooltip/index.vue";
import type { ResultRecord } from "~/types/result";
const props = defineProps<{ recordId: string }>();
const record = inject("record") as Ref<ResultRecord>;
const miniPage = inject("miniPage") as Ref<string>;
const route = useRoute();
const pageUrl = location.href;

const hadAutoShow = get("hadAutoShowResultShareCode");
const autoShow = computed(() => {
  return route.query.fromType == "run" && !hadAutoShow; // 从模拟页面跳转过来的
});

watch(
  () => autoShow,
  (val) => {
    if (val) {
      set("hadAutoShowResultShareCode", true);
    }
  },
  { immediate: true }
);
</script>

<style></style>
