<template>
  <div class="buff-select bg-[#111218] flex flex-wrap">
    <!-- <a-row :gutter="10">
      <a-col v-for="(item, index) in list" :key="index" :span="2">
        <div
          class="p-2 border border-gray-600 border-solid rounded"
          @click="handleChange(item.value)"
        >
          <span>{{ item.name }}</span>
        </div>
      </a-col>
    </a-row> -->
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{
        'text-themeGreen !border-[#23b18bbd]': modelValue.includes(item.value),
      }"
      class="bg-[#24252A] flex mr-3 cursor-pointer py-2 px-4 box-border border border-[#3C3D3E] rounded relative overflow-hidden mb-2"
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
        class="absolute -bottom-0 -right-0 w-[15px] text-[12px] text-[#23b18bbd]"
      ></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: { name: string; value: string; desc?: string }[];
  modelValue: string[]; // 选中的buff
}>();

const emit = defineEmits(["update:modelValue"]);

const handleChange = (value: string) => {
  const index = props.modelValue.indexOf(value);
  const newChecked = [...props.modelValue];
  if (index === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(index, 1);
  }
  emit("update:modelValue", newChecked);
};
</script>

<style lang="scss" scoped>
.buff-select {
  color: var(--color-text-2);
}
</style>
