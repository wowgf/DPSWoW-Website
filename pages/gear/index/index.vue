<template>
  <GearMain
    ref="gearMainRef"
    showGear
    showComb
    showCombNum
    showTalent
    showEnchant
    showGem
    @run="onRun"
  >
  </GearMain>
</template>
<script setup lang="ts">
import GearMain from "~/components/GearMain/index.vue";

const gearMainRef = ref<any>(null);

function onRun(runParams: any) {
  service.simc
    .run({ ...runParams, type: 1 })
    .then((res) => {
      gearMainRef.value.runSuccess(res);
      useRouter().push({
        path: "/gear/result",
        query: { id: res.id, fromType: "run" },
      });
    })
    .finally(() => {
      setTimeout(() => {
        gearMainRef.value?.stopRun();
      }, 3000);
    });
}
</script>
<style lang="scss" scoped></style>
