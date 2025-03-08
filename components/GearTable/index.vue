<template>
  <div class="gear-table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            v-for="gearKey in tableHeadOptions"
            :key="gearKey"
            class="font-normal"
          >
            {{ gearNameMap[gearKey] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allShowCombinations" :key="index">
          <td>
            <span v-if="isCurrentComb(item)">
              <div class="text-gray-300" >搭配{{ index + 1 }}</div>
              <div class="text-xs text-gray-400">自身装备</div>
            </span>
            <span v-else class="text-gray-300">搭配{{ index + 1 }}</span>
          </td>
          <td v-for="gearKey in tableHeadOptions" :key="gearKey" class="p-2">
            <div class="w-[40px] h-40px">
              <GearImg
                v-if="
                  item[gearKey] && (item[gearKey]?.isSelected || index == 0)
                "
                :src="item[gearKey]?.iconUrl || item[gearKey]?.icon_url"
                :quality="item[gearKey]?.quality"
                :level="item[gearKey]?.gearLevel"
                :data="item[gearKey]"
                :show-border="true"
                full-mask
              ></GearImg>
            </div>
          </td>
          <td>
            <a-tooltip mini content="删除该组合" position="right">
              <a-button
                type="primary"
                status="warning"
                shape="circle"
                v-if="!isCurrentComb(item)"
                size="mini"
                @click="onRemoveComb(index)"
              >
                <icon-close />
              </a-button>
            </a-tooltip>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="allCombinations.length > 1"
      class="flex justify-center mt-1 expand-wrap"
    >
      <a-link
        :type="isExpand ? 'secondary' : 'primary'"
        size="mini"
        @click="isExpand = !isExpand"
      >
        {{ isExpand ? "收起" : "展开全部搭配" }}
      </a-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  allCombinations: any;
  tableHeadOptions: any;
  gearNameMap: any;
  isCurrentComb: any;
  onRemoveComb: any;
}>();

const isExpand = ref(false);

const allShowCombinations = computed(() => {
  return isExpand.value
    ? props.allCombinations
    : props.allCombinations.slice(0, 1);
});
</script>

<style lang="scss" scoped>
.gear-table {
  transition: height 0.3s ease;
}
</style>
