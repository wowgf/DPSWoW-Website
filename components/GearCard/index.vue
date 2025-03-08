<template>
  <div
    class="flex p-3 overflow-hidden border-[1px] border-gray-200 rounded gear-card cursor-pointer"
  >
    <div
      :style="{ borderColor: qualityColor[data.quality] }"
      class="img h-[40px] w-[40px] rounded overflow-hidden border-2"
    >
      <a
        :href="`https://www.damijing.com/item/${id}`"
        target="_blank"
        @click.prevent
      >
        <img
          :src="data.icon_url"
          class="inline-block object-cover w-full h-full"
        />
      </a>
      <!-- <a-tooltip position="right" mini>
        <img
          :src="data.icon_url"
          class="inline-block object-cover w-full h-full"
        />
        <template #content>
          <div v-html="data.tooltip"></div>
        </template>
      </a-tooltip> -->
    </div>
    <div class="flex flex-col justify-between flex-1 ml-2 overflow-hidden">
      <div
        :style="{ color: qualityColor[data.quality] }"
        class="text-sm leading-none"
      >
        {{ data.name }}
      </div>
      <div class="flex text-xs leading-none">
        <div class="mr-3">
          <span>附魔：</span>
          <span :style="{ color: qualityColor[3] }">浮光爆击</span>
        </div>
        <div>
          <span>镶嵌：</span>
          <span :style="{ color: qualityColor[5] }">顶峰渎神玉</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div v-if="level > 0" class="text-sm">
        <span>等级：</span>
        <span>{{ level }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: any;
  data: any;
}>();

const quality = ref(4);

const level = computed(() => {
  let level = extractItemLevel(props.data?.tooltip);
  return level || 0;
});

//  const qualityColor:any = {
//    1: '#9d9d9d', // 粗糙
//    2: '#fff', // 普通
//    3: '#1eff00', // 优秀
//    4: '#0070dd', // 精良
//    5: '#9345ff', // 史诗
//    6: '#ff8000', // 传说
//    7: '#0cf', // 传家宝
//  }

const qualityColor: any = {
  0: "#9d9d9d", // 粗糙
  1: "#fff", // 普通
  2: "#1eff00", // 优秀
  3: "#0070dd", // 精良
  4: "#9345ff", // 史诗
  5: "#ff8000", // 传说
  6: "#0cf", // 传家宝
};

function extractItemLevel(htmlString: string) {
  // 使用正则表达式匹配物品等级
  const regex = /物品等级：<!--ilvl-->(\d+)/;
  const match = htmlString.match(regex);

  if (match && match[1]) {
    return match[1]; // 返回物品等级
  }

  return null; // 如果没有找到物品等级，则返回null
}
</script>

<style lang="scss" scoped>
.gear-card {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
