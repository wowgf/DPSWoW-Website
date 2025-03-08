<template>
  <div class="p-3 bg-blockBg">
    <div class="flex flex-wrap gap-3">
      <div
        v-for="(item, index) in fightPresets"
        :key="index"
        :class="{
          'text-[#23B18B] !border-[#23B18B]': isSelected(item),
        }"
        class="bg-[#3C3D3E] cursor-pointer py-2 px-4 box-border border-2 border-[#3C3D3E] rounded relative overflow-hidden select-none"
        @click="onSelectPreset(item, index)"
      >
        <span>{{ item.name }}</span>
        <SvgIcon
          name="checked-fill"
          v-if="isSelected(item)"
          class="absolute -bottom-0 -right-0 w-[15px] text-[12px]"
        ></SvgIcon>
      </div>
    </div>
    <a-form
      v-if="!onlyRankSimcConfig"
      :rules="fightFormRules"
      ref="fightFormRef"
      :model="simcConfig"
      layout="inline"
      class="mt-4"
    >
      <a-form-item label="战斗方式" field="fight_style">
        <a-select
          v-model="simcConfig.fight_style"
          :style="{ width: '200px' }"
          placeholder="请选择战斗方式"
          @change="onChangeConfig"
        >
          <a-option
            v-for="(item, index) in dict.fightStyleOptions"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="目标数量" field="desired_targets">
        <a-select
          v-model="simcConfig.desired_targets"
          :style="{ width: '200px' }"
          placeholder="请选择目标数量"
          @change="onChangeConfig"
        >
          <a-option
            v-for="(item, index) in dict.desiredTargetOptions"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="战斗时长" field="max_time">
        <a-select
          v-model="simcConfig.max_time"
          :style="{ width: '200px' }"
          placeholder="请选择战斗时长"
          @change="onChangeConfig"
        >
          <a-option
            v-for="(item, index) in dict.maxTimeOptions"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useDict } from "~/cool";
import { useParam } from "~/cool/hook/param";
const props = defineProps<{
  defaultConfigType?: number;
  onlyRankSimcConfig?: boolean;
}>();
const { dict } = useDict([]);

const simcConfig = reactive<any>({
  fight_style: undefined,
  desired_targets: undefined,
  max_time: undefined,
});

const fightPresets = ref<
  { name: string; config: any; allowRank: boolean; rankType: number }[]
>([]);
const fightFormRef = ref();

const selectPresetIndex = ref<number>();

const fightFormRules = {
  fight_style: [
    { required: false, message: "请选择战斗模式", trigger: "blur" },
  ],
  desired_targets: [
    { required: false, message: "请选择目标数量", trigger: "blur" },
  ],
  max_time: [{ required: false, message: "请选择战斗时长", trigger: "blur" }],
};

const emits = defineEmits(["change", "select"]);

// const { getParam } = useParam([]);

// getParam(["fightPresets"]).then((param) => {
//   let res = param.fightPresets || {};
//   let list = res.presets || [];

//   if (props.onlyRankSimcConfig) {
//     list = list.filter((item: any) => item.allowRank);
//   }

//   debugger
//   fightPresets.value = list;

//   if (props.defaultConfigType) {
//     const item = list.find(
//       (item: any) => item.rankType == props.defaultConfigType
//     );

//     if (item) {
//       onSelectPreset(item);
//     } else {
//       onSelectPreset(fightPresets.value[0], 0);
//     }
//   } else {
//     onSelectPreset(fightPresets.value[0], 0);
//   }
// });

service.comm.getParam("fightPresets").then((res) => {
  let list = res.presets || [];

  if (props.onlyRankSimcConfig) {
    list = list.filter((item: any) => item.allowRank);
  }

  fightPresets.value = list;

  if (props.defaultConfigType) {
    const item = list.find(
      (item: any) => item.rankType == props.defaultConfigType
    );

    if (item) {
      onSelectPreset(item);
    } else {
      onSelectPreset(fightPresets.value[0], 0);
    }
  } else {
    onSelectPreset(fightPresets.value[0], 0);
  }
});

// init();

// async function init() {
//   const { param } = useParam(["fightPresets"]);

//   let list = param.fightPresets?.presets || [];

//   if (props.onlyRankSimcConfig) {
//     list = list.filter((item: any) => item.allowRank);
//   }

//   fightPresets.value = list;

//   if (props.defaultConfigType) {
//     const item = list.find(
//       (item: any) => item.rankType == props.defaultConfigType
//     );

//     if (item) {
//       onSelectPreset(item);
//     } else {
//       onSelectPreset(fightPresets.value[0], 0);
//     }
//   } else {
//     onSelectPreset(fightPresets.value[0], 0);
//   }
// }

function isSelected(item: any) {
  for (let key in simcConfig) {
    if (item.config[key] != simcConfig[key]) {
      return false;
    }
  }
  return true;
}

/**
 * 选择预设
 * @param item
 */
function onSelectPreset(item: any, index?: number) {
  selectPresetIndex.value = index;
  for (let key in simcConfig) {
    simcConfig[key] = item.config[key];
  }
  fightFormRef.value?.validate();
  emits("select", item.config, index);
  emits("change", simcConfig);
}

function onChangeConfig() {
  emits("change", simcConfig);
  emits("select", simcConfig);
}
</script>

<style></style>
