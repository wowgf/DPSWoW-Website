<template>
  <a-tooltip
    position="right"
    trigger="hover"
    :popup-hover-stay="false"
    :mouse-leave-delay="1"
    :mouse-enter-delay="200"
    :disabled="!itemId"
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
  level?: any;
  itemId?: any;
  bonus?: any;
  gems?: any; // 宝石ID
  ench?: any; // 附魔ID
  spec?: any; // 附魔ID
  craftingQuality?: number;
  craftedStats?: any;
}>();

const htmlStr = ref("加载中");
const tooltipRef = ref();

let saveBonusId = props.itemId;

const specId = inject("specId", null) as unknown as Ref<any>;

function onVisibleChange(visible: boolean) {
  if (visible) getHtml();
}

function getHtml() {
  if (props.bonus != saveBonusId) htmlStr.value = "加载中";
  if (htmlStr.value != "加载中") return;
  if (props.itemId) {
    saveBonusId = props.bonus;
    service.newbee
      .getTooltipData({
        level: props.level,
        itemId: props.itemId,
        bonus: (props.bonus && props.bonus.split("/").join(":")) || undefined,
        gems: (props.gems && props.gems.split("/").join(":")) || undefined,
        ench: props.ench || undefined,
        spec: specId?.value || props.spec || undefined,
        "crafting-quality": props.craftingQuality || undefined,
        "crafted-stats":
          (props.craftedStats && props.craftedStats.split("/").join(":")) ||
          undefined,
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
