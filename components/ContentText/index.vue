<template>
  <div ref="contentRef" class="content-text" @click="onClick">
    <div v-html="htmlText"></div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "@arco-design/web-vue";
import { CLICK_EXTERNAL_LINK, JUMP_EXTERNAL_LINK } from "~/consts/trackEvent";

const props = defineProps<{
  content: string;
  whiteUrls?: string[];
}>();

const contentRef = ref<HTMLElement>();
const htmlText = computed(() => {
  return props.content.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" class="cursor-pointer text-[#89898b] hover:text-blue-500"> [$1] </a>'
  );
});

const defaultWhiteUrls = [
  "https://www.wowgf.com",
  "https://wow.miaoyanai.com",
  location.origin,
];

watch(
  () => htmlText.value,
  (val) => {
    nextTick(() => {
      //  所有链接添加click事件，取消原有的跳转
      const links = document.querySelectorAll(".content-text a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
    });
  },
  {
    immediate: true,
  }
);

// 判断是否为外部链接
function isOnwer(url: string) {
  return defaultWhiteUrls.some((item) => {
    if (url.startsWith(item)) {
      return true;
    }
  });
}

function onClick(e: any) {
  if (!e.target.href) return;

  if (isOnwer(e.target.href)) {
    window.open(e.target.href, "_blank");
    return;
  }

  recordLog({
    event: CLICK_EXTERNAL_LINK,
    params: {
      url: e.target.href,
    },
  });

  Modal.confirm({
    title: "即将离开魔兽工坊",
    content: "此网址不属于本网站，请谨慎访问  " + e.target.href,
    okText: "继续访问",
    onOk: async () => {
      window.open(e.target.href, "_blank");
      service.track.fetchRecord({
        event: JUMP_EXTERNAL_LINK,
        params: {
          url: e.target.href,
        },
      });
    },
  });
}
</script>

<style></style>
