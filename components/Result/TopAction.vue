<template>
  <div class="flex items-center gap-3 ml-3 result-top-action">
    <nuxt-link :to="backPath">
      <a-button
        class="px-4 py-[10px] pl-3 bg-red-700 hover:bg-red-600 text-white font-medium rounded border-2 border-red-500 transition-colors duration-200 flex items-center gap-1"
        @click="recordLog({ event: CONFIRM_VERIFICATION_CODE })"
      >
        <icon-left class="mt-[1px]" />返回模拟
      </a-button>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {
  CONFIRM_VERIFICATION_CODE,
  CLICK_UPLOAD_TO_RANK,
} from "~/consts/trackEvent";
import ShareBtn2 from "~/components/Result/ShareBtn2.vue";
import { useRank } from "~/cool/hook/rank";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "~/store/user";
import type { ResultRecord } from "~/types/result";
const props = defineProps<{
  backPath: string;
  simcConfig?: any;
  recordId?: any;
  recordUserId?: any;
}>();

const type = inject("type");
const record = inject("record") as Ref<ResultRecord>;
const route = useRoute();

const { info, isLogin } = storeToRefs(useUserStore());
const { canUploadToRank } = useRank();

const uploadDpsLoading = ref(false);
const showUploadAnimation = ref(false);

const showUploadBtn = computed(() => {
  const show =
    canUploadToRank(
      props.simcConfig,
      record.value?.params?.isSourceSimcStr,
      record.value?.params?.isDefaultStr
    ) &&
    type != 6 &&
    props.recordUserId == info.value?.id &&
    record.value?.isRank == 0;
  if (show) {
    if (!get("HAD_SHOW_UPLOAD_ANIMATION") && route.query.fromType == "run") {
      showUploadAnimation.value = true;
      set("HAD_SHOW_UPLOAD_ANIMATION", true);
    }
  }
  return show;
});

const onUploadToRank = () => {
  uploadDpsLoading.value = true;
  recordLog({ event: CLICK_UPLOAD_TO_RANK });
  service.rank
    .uploadDps({ recordId: props.recordId })
    .then(() => {
      setTimeout(() => {
        Message.success("上传成功！");
        if (record.value) record.value.isRank = 1;
      }, 1000);
    })
    .finally(() => {
      setTimeout(() => {
        uploadDpsLoading.value = false;
      }, 1000);
    });
};
</script>

<style lang="scss" scoped>
.upload-btn-ani {
  animation: scaleAnimation 1.5s infinite;

  @keyframes scaleAnimation {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
}
</style>
