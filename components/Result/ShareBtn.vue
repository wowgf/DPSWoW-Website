<template>
  <a-tooltip v-model:popup-visible="showTooltip" mini trigger="hover">
    <a-link @click.prevent="onCopyWisperClick">
      <span class="mr-1">分享{{ isLogin? '我的战绩':'TA的战绩' }}</span>
      <SvgIcon name="share"></SvgIcon
    ></a-link>
    <template #content>
      <div class="py-1">
        <div>分享你的搭配给更多朋友</div>
        <!-- <div class="text-sm">
          <div>复制链接，分享你的DPS组合给更多朋友</div>
          <span class="text-gray-400">{{ content }}</span>
        </div>
        <div class="mt-1 text-end">
          <a-button
            size="mini"
            type="primary"
            @click.prevent="onCopyWisperClick"
            >复制</a-button
          >
        </div> -->
      </div>
    </template>
  </a-tooltip>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "~/store/user";

const { isLogin } = storeToRefs(useUserStore());

const showTooltip = ref(false);

const content = location.href;

const onCopyWisperClick = () => {
  copy(content);
  Message.success("链接已复制！快去分享给更多朋友吧。");
  showTooltip.value = false;
};
</script>

<style></style>
