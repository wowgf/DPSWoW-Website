<template>
  <GearMain
    ref="gearMainRef"
    :sourceSlots="['current']"
    :defaultConfigType="rankType"
    :disabledRun="disabledRun"
    :disabledRunContent="disabledRunContent"
    :showExampleBtn="false"
    rankTipText="当前配置的运行结果默认上传到排行榜"
    onlyRankSimcConfig
    showRankTip
    @parse="onParse"
    @run="onRun"
    :empty-box-text1="'粘贴数据至上方输入框，将会解析出你当前装备和天赋'"
    :empty-box-text2="'点击开始模拟后，将会上传你的DPS跑分到排行榜'"
  >
  </GearMain>
</template>
<script setup lang="ts">
import GearMain from "~/components/GearMain/index.vue";

const gearMainRef = ref<any>(null);

const rankType: any = useRoute().query.rankType;

const isSourceSimcStr = ref(false);

const disabledRunContent = computed(() => {
  if (!isSourceSimcStr.value) return "SIMC插件导出的字符串被修改";
  return "";
});

const disabledRun = computed(() => {
  return !!disabledRunContent.value;
});

function onParse(data: any) {
  isSourceSimcStr.value = data.isSourceSimcStr;
}

function onRun(runParams: any) {
  service.simc
    .run({ ...runParams, type: 6 })
    .then((res) => {
      gearMainRef.value.runSuccess(res);
      useRouter().push({
        path: "/gear/result/rank",
        query: { id: res.id, from: "rank", fromType: "run" },
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
