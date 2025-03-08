<template>
  <div
    class="w-[1000px] h-[700px] rounded-2xl ml-auto mr-auto bg-[#2A2A2B] flex overflow-hidden shadow-lg install-guide font-mono"
  >
    <div class="install-guide__nav w-[250px] bg-[#111218] px-3 py-10">
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="{
          'bg-[#2A2A2B]': stepNum == index,
        }"
        class="flex px-3 py-2 mb-3 cursor-pointer rounded-2xl nav-item"
        @click="setStepNum(index)"
      >
        <div
          :class="{
            'bg-[#fc4f4f] text-white border-none': stepNum == index,
            'border-[#fc4f4f]': stepNum > index,
            'border-gray-400': stepNum < index,
          }"
          class="flex items-center justify-center mr-3 text-xl font-black border-2 border-solid rounded-full w-[45px] h-[45px] step-num"
        >
          <span v-if="stepNum <= index" class="text-[22px]">{{
            index + 1
          }}</span>
          <!-- <el-icon v-else><Select class="text-[#2A2A2B]" /></el-icon> -->
          <icon-check v-else :style="{ color: '#fc4f4f' }" />
        </div>
        <div class="flex flex-col justify-between step-main">
          <div
            :class="{
              'text-[#fc4f4f]': stepNum >= index,
              'text-gray-400': stepNum < index,
            }"
            class="text-lg font-[900] step-title"
          >
            <span class="mr-1">步骤</span><span>{{ index + 1 }}</span>
          </div>
          <div
            :class="{
              'text-[#fc4f4f]': stepNum >= index,
              'text-gray-400': stepNum < index,
            }"
            class="font-normal step-title"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-1 page--install-guide__main">
      <div class="flex-1 w-full overflow-hidden step-wrap">
        <!-- <Step2 v-if="stepNum == 0"></Step2>
				<Step1 v-if="stepNum == 1"></Step1>
				<Step3 v-if="stepNum == 2"></Step3> -->
      </div>
      <div class="flex justify-center px-4 py-4 action-wrap">
        <a-button
          v-if="isLogin && stepNum < 2"
          shape="round"
          type="primary"
          class="w-[200px]"
          @click="nextStep"
        >
          下一步
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Select } from "@element-plus/icons-vue";
import { provide } from "vue";
const props = defineProps<{
  isLogin: boolean;
}>();
const navList = [
  {
    title: "下载插件",
    desc: "使用妙言AI",
    icon: "use",
  },
  {
    title: "解析装备",
    desc: "安装妙言AI",
    icon: "install",
  },
  {
    title: "选择要对比的装备",
    desc: "常见问题解答",
    icon: "question",
  },
];

let stepNum = ref(0);

provide("stepNum", stepNum);
provide("isLogin", props.isLogin);

watch(
  () => props.isLogin,
  (val) => {
    // if (val) {
    // 	stepNum.value = 1;
    // } else {
    // 	stepNum.value = 0;
    // }
  },
  { immediate: true }
);

function setStepNum(num: number) {
  if (!props.isLogin) return;
  stepNum.value = num;
}

function nextStep() {
  stepNum.value++;
}
</script>

<style lang="scss" scoped>
.install-guide {
}
</style>
