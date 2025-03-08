<template>
  <ItemTooltip :item-id="itemId" :crafting-quality="craftingQuality">
    <div
      :style="{ borderColor: quality ? QualityColorMap[quality] : '' }"
      :class="{
        '!border-0': hideBorder,
      }"
      class="relative flex items-center justify-center w-full h-full border-[1.5px] cursor-pointer item-img"
    >
      <img :src="src" class="w-full h-full" />
      <img
        v-if="craftingQualityImgMay[craftingQuality]"
        :src="craftingQualityImgMay[craftingQuality]"
        class="absolute w-full h-full -left-1 -top-1"
      />
    </div>
  </ItemTooltip>
</template>

<script setup lang="ts">
import craftingQuality1 from "~/assets/images/item/crafting-quality-1.png";
import craftingQuality2 from "~/assets/images/item/crafting-quality-2.png";
import craftingQuality3 from "~/assets/images/item/crafting-quality-3.png";
import { QualityColorMap } from "~/consts/quality";

const props = defineProps<{
  src: string;
  craftingQuality?: any;
  itemId: number;
  quality?: any;
  hideBorder?: boolean;
}>();

const craftingQualityImgMay: any = {
  1: craftingQuality1,
  2: craftingQuality2,
  3: craftingQuality3,
  4: craftingQuality1,
  5: craftingQuality2,
  6: craftingQuality3,
};
</script>

<style lang="scss" scoped>
.item-img {
  background-image: url("~/assets/images/item/default.png");
  background-size: cover;
  background-position: center;
}
</style>
