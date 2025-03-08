<template>
  <div class="flex flex-wrap gap-3 talent-select">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{
        'text-[#23B18B] !border-[#23B18B]': modelValue.includes(item.value),
      }"
      class="bg-[#3C3D3E] flex cursor-pointer py-2 px-4 box-border border-2 border-[#3C3D3E] rounded relative overflow-hidden mb-2"
      @click="handleChange(item.value)"
    >
      <span>{{ item.name }}</span>
      <el-tooltip v-if="item.desc" placement="top">
        <icon-question-circle
          class="ml-1 cursor-pointer mt-[3px] text-gray-500"
          style="color: gray"
        />
        <template #content>
          <div>
            {{ item.desc }}
          </div>
        </template>
      </el-tooltip>
      <SvgIcon
        name="checked-fill"
        v-if="modelValue.includes(item.value)"
        class="absolute -bottom-0 -right-0 w-[15px] text-[12px]"
      ></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";

const props = defineProps<{
  list: { name: string; value: string; desc?: string }[];
  modelValue: string[]; // 选中的buff
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const handleChange = (value: string) => {
  const index = props.modelValue.indexOf(value);
  const newChecked = [...props.modelValue];
  if (index === -1) {
    newChecked.push(value);
  } else {
    if (props.modelValue.length > 1) {
      newChecked.splice(index, 1);
    } else {
      // Message.normal('')
    }
  }
  emit("update:modelValue", newChecked);
  emit("change", newChecked);
};
</script>

<style lang="scss" scoped>
.talent-select {
  color: var(--color-text-2);
}
</style>
