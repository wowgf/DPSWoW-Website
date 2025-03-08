<template>
  <GearMain ref="gearMainRef" :sourceSlots="['current']" showRankTip hideToBottom @run="onRun"
    :empty-box-text1="'粘贴数据至上方输入框，将会解析出你当前装备和天赋'"
    :empty-box-text2="'点击开始模拟后，即可快速模拟出DPS'">
  </GearMain>
</template>
<script setup lang="ts">
import GearMain from "~/components/GearMain/index.vue";

const gearMainRef = ref<any>(null);

function onRun(runParams: any) {
  service.simc
    .run({ ...runParams, type: 2 })
    .then((res) => {
      gearMainRef.value.runSuccess(res);
      useRouter().push({ path: "/gear/result/quick", query: { id: res.id, fromType: "run" } });
    })
    .finally(() => {
      setTimeout(() => {
        gearMainRef.value?.stopRun();
      }, 3000);
    });
}
</script>
<style lang="scss" scoped></style>
