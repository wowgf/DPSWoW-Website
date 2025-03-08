<template>
  <div>
    <table class="w-full table-auto">
      <tbody>
        <tr
          v-for="(group, index) in itemSlotGroupList?.filter(
            (v) => v.itemList.length > 0
          )"
          :key="index"
        >
          <td
            class="w-32 py-3 pr-3 text-center text-gray-300 border-t border-b border-gray-500"
          >
            <div>{{ getAllLocalValue(group.label) }}</div>
          </td>
          <td class="py-3 border-t border-b border-gray-500">
            <a-row :gutter="[16, 0]">
              <a-col
                v-for="(item, index) in group.itemList"
                :key="index"
                :lg="6"
                :xs="12"
              >
                <ItemCard :data="item">
                  <div v-if="showItemSlot" class="text-gray-400">
                    <span v-if="groupByType == 'boss'">
                      {{ getSlotNameByInventoryType(item.inventoryType) }}
                    </span>
                    <span v-if="groupByType == 'slot' && item.sources">
                      {{
                        getAllLocalValue(
                          getBossNameById(
                            bossList || [],
                            item.sources[0].encounterId
                          ) || ""
                        )
                      }}
                    </span>
                  </div>
                </ItemCard>
              </a-col>
            </a-row>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Encounter, ItemSource } from "~/types/instance";
import ItemCard from "./ItemCard.vue";
import { GearNameMap, GearSlotTypeId } from "~/consts/wowItem";
import type { GearData } from "~/types/gear";
import { getAllLocalValue } from "~/cool/utils/language";
import { getSlotNameByInventoryType, getBossNameById } from "~/cool/simc";
const props = defineProps<{
  data: GearData[];
  spec?: string; // 专精
  metier?: string; // 职业
  groupByType?: string; // 分组类型
  bossList?: Encounter[]; // boss列表
  showItemSlot?: boolean;
}>();

const baseLevel = inject("baseLevel", 0);

const itemOptions: string[] = [
  "main_hand",
  "off_hand",
  "head",
  "neck",
  "shoulder",
  "back",
  "chest",
  "wrist",
  "hands",
  "waist",
  "legs",
  "feet",
  "finger",
  "trinket",
];

const itemList = computed(() => {
  return props.data;
});

const itemSlotGroupList = computed(() => {
  if (props.groupByType == "boss") {
    return groupByBoss();
  }

  if (props.groupByType == "slot") {
    return groupBySlot();
  }
  return [];
});

/**
 * 根据装备位置分组
 */
function groupBySlot() {
  return itemOptions
    .map((slotKey) => {
      let inventoryType = GearSlotTypeId[slotKey];

      return {
        slotKey,
        label: GearNameMap[slotKey],
        itemList: (slotKey == "main_hand"
          ? itemList.value.filter((item) => item.itemClass == 2)
          : itemList.value.filter(
              (item) => item.inventoryType == inventoryType
            ) || []
        ).sort((a, b) => b.gearLevel - a.gearLevel),
      };
    })
    .filter((item) => item.itemList.length > 0);
}

/**
 * 根据boss分组
 */
function groupByBoss() {
  return props.bossList?.map((boss) => {
    return {
      label: boss.name,
      itemList: itemList.value.filter((item) =>
        item.sources?.some(
          (source: ItemSource) => source.encounterId == boss.id
        )
      ),
    };
  });
}
</script>

<style></style>
