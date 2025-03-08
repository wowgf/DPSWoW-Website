<template>
  <div class="mt-3 gear-wrap">
    <a-row :gutter="25">
      <a-col :span="8">
        <gear-group label="头部">
          <GearCard
            v-for="(item, index) in gearData.head"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
      <a-col :span="8">
        <gear-group label="颈部">
          <GearCard
            v-for="(item, index) in gearData.neck"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
      <a-col :span="8">
        <gear-group label="肩部">
          <GearCard
            v-for="(item, index) in gearData.shoulder"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
      <a-col :span="8">
        <gear-group label="背部">
          <GearCard
            v-for="(item, index) in gearData.back"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
      <a-col :span="8">
        <gear-group label="胸部">
          <GearCard
            v-for="(item, index) in gearData.chest"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
      <a-col :span="8">
        <gear-group label="腕部">
          <GearCard
            v-for="(item, index) in gearData.wrist"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="手部">
          <GearCard
            v-for="(item, index) in gearData.hands"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="腰部">
          <GearCard
            v-for="(item, index) in gearData.waist"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="腿部">
          <GearCard
            v-for="(item, index) in gearData.legs"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="脚部">
          <GearCard
            v-for="(item, index) in gearData.feet"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="戒指">
          <GearCard
            v-for="(item, index) in gearData.rings"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="饰品">
          <GearCard
            v-for="(item, index) in gearData.trinkets"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="主手">
          <GearCard
            v-for="(item, index) in gearData.main_hand"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>

      <a-col :span="8">
        <gear-group label="副手">
          <GearCard
            v-for="(item, index) in gearData.off_hand"
            :key="index"
            :id="item.id"
            :data="item"
          ></GearCard>
        </gear-group>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import type { Gear } from "~/types/gear";

const props = defineProps<{
  gearData: Gear;
}>();
</script>

<style></style>
