<template>
  <a-tooltip
    position="right"
    trigger="hover"
    :mouse-leave-delay="1"
    :mouse-enter-delay="200"
    :disabled="!id"
    :content-style="{ padding: 0 }"
    @popup-visible-change="onVisibleChange"
  >
    <slot></slot>
    <template #content>
      <div ref="tooltipRef" class="max-h-[85vh] overflow-auto p-2">
        <div v-html="htmlStr"></div>
      </div>
    </template>
  </a-tooltip>
</template>
<script setup lang="ts">
const props = defineProps<{
  id?: any;
}>();

const htmlStr = ref("加载中");
const tooltipRef = ref();

function onVisibleChange(visible: boolean) {
  getHtml();
}

function getHtml() {
  if (htmlStr.value != "加载中") return;
  if (props.id) {
    service.newbee
      .getSpellTooltipData({
        id: props.id,
      })
      .then((res) => {
        htmlStr.value = res.data.tooltip || "加载中";
        nextTick(() => {
          setTimeout(() => {
            addAClickEvent();
          }, 500);
        });
      });
  }
}
/**
 * 给tooltipRef下的所有a标签添加点击事件，点击后打开新窗口
 */
function addAClickEvent() {
  nextTick(() => {
    const aList = tooltipRef.value?.querySelectorAll("a");
    aList?.forEach((a: HTMLAnchorElement) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        window.open(
          a.href.replace(location.origin, "https://www.wowhead.com"),
          "_blank"
        );
      });
    });
  });
}
</script>

<style></style>
