<template>
  <!-- <ItemTooltip
    :item-id="data.itemId"
    :bonus="data.bonus_id"
    :gems="data.gem_id"
    :ench="data.enchant_id"
  > -->
  <div
    :style="{
      borderColor: selected
        ? '#F44336'
        : (showQuilityBorderColor && qualityColor[data.quality]) || '#9ca3af',
      borderStyle: selected ? 'solid' : borderStyle,
    }"
    :class="{
      'border-[1.5px]': showBorder || selected,
    }"
    class="relative w-full h-full aspect-square overflow-hidden rounded cursor-pointer bg-[#33363D] select-none"
  >
    <ItemTooltip
      :item-id="data.itemId"
      :bonus="data.bonus_id"
      :gems="data.gem_id"
      :ench="data.enchant_id"
      :craftedStats="data.crafted_stats"
      :craftingQuality="data.craftingQuality + 3"
    >
      <div
        v-if="showMask"
        :class="{ 'full-mask': fullMask }"
        class="absolute top-0 left-0 right-0 h-full mask-box z-2 mask-bg"
      ></div>
      <div
        v-else
        class="absolute top-0 left-0 right-0 h-full mask-box z-2"
      ></div>
    </ItemTooltip>
    <img
      :src="data.iconUrl || data.icon_url"
      class="inline-block object-cover w-full h-full"
    />
    <img
      v-if="selected"
      src="~/assets/images/check.png"
      class="absolute -bottom-1 -right-1 w-[15px]"
    />
    <span
      v-if="data.slot == 'weekly' && showSlot"
      class="absolute top-[2px] left-[2px] text-[10px] font-bold text-green-400 z-3"
    >
      {{ slotMap[data.slot] || "" }}</span
    >
    <span
      v-if="level && !hideLevel"
      class="absolute bottom-[2px] left-[2px] text-xs font-bold text-slate-300 z-3"
    >
      {{ level }}</span
    >
    <img
      v-if="data.craftingQuality && showCraftingQuality"
      :src="`/images/wow/item/crafting-${data.craftingQuality}.png`"
      class="absolute top-0 z-10 h-4 -left-0"
    />
    <div
      class="absolute bottom-[1px] right-[1px] z-10 flex justify-end w-full gem-ench-wrap"
    >
      <template v-if="data.gem_id">
        <ItemTooltip
          v-for="(gem_id, index) in data.gem_id.split('/')"
          :key="index"
          :item-id="gem_id"
        >
          <img
            :src="getEnchantItemByItemId(gem_id)?.iconUrl || GemIcon"
            :style="{
              borderColor:
                qualityColor[getEnchantItemByItemId(gem_id)?.quality || 1],
            }"
            class="w-[30%] border-[1.5px] border-solid ml-[1px]"
          />
        </ItemTooltip>
      </template>

      <ItemTooltip :item-id="getEnchantItemByWowId(data.enchant_id)?.itemId">
        <img
          v-if="data.enchant_id"
          :src="getEnchantItemByWowId(data.enchant_id)?.iconUrl || EnchantIcon"
          :style="{
            borderColor:
              qualityColor[
                getEnchantItemByWowId(data.enchant_id)?.quality || 1
              ],
          }"
          class="w-[30%] border-[1.5px] border-solid"
        />
      </ItemTooltip>
    </div>
  </div>
  <!-- </ItemTooltip> -->
</template>

<script setup lang="ts">
import { QualityColorMap } from "~/consts/quality";
import { useWowDataStore } from "~/store/wowData";
import GemIcon from "~/assets/images/gem.png";
import EnchantIcon from "~/assets/images/enchanted.png";

const { getEnchantItemByWowId, getEnchantItemByItemId } = useWowDataStore();

const props = withDefaults(
  defineProps<{
    src?: string;
    quality?: any;
    selected?: boolean;
    level?: any;
    itemId?: any;
    bonus?: any;
    data?: any;
    hideLevel?: boolean;
    hideMask?: boolean;
    showBorder?: boolean;
    borderStyle?: string;
    showQuilityBorderColor?: boolean; // 是否显示品质边框颜色
    fullMask?: boolean;
    showSlot?: boolean;
    showCraftingQuality?: boolean;
  }>(),
  {
    showBorder: true,
    borderStyle: "solid", // dotted solid
    showQuilityBorderColor: true,
    hideMask: false,
    showSlot: true,
  }
);

const slotMap: any = {
  bag: "背包",
  weekly: "低保",
};

const level = computed(() => {
  return props.level || props.data?.gearLevel;
});

const showMask = computed(() => {
  return !props.hideMask;
});

const aHref = computed(() => {
  if (!props.data?.itemId) return "";
  const bonus = (props.data?.bonus_id || props.bonus)?.split("/").join(":");
  // return `https://www.wowhead.com/item=${props.data?.itemId}?bonus=${bonus}&ilvl=${props.level}`;
  // return `https://db.newbeebox.com/wow/item=${props.data?.itemId}?bonus=${bonus}&ilvl=${props.level}`;
});

const qualityColor: any = QualityColorMap;
</script>

<style lang="scss" scoped>
.mask-bg {
  background: linear-gradient(to top, #00000099, #00000000);
  &.full-mask {
    background: rgb(0 0 0 / 30%);
  }
}
</style>
