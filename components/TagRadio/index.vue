<template>
  <div class="flex gap-2">
    <div
      v-for="(item, index) in options"
      :key="index"
      :class="{
        'text-themeGreen border-themeGreen': item.value === modelValue,
      }"
      class="px-3 py-1 font-[500] border-[1.5px] border-gray-300 rounded cursor-pointer"
      @click="selectOption(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: any }[];
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectOption = (value: string) => {
  console.log(value);

  emit("update:modelValue", value);
};
</script>

<style>
.selected {
  font-weight: bold;
}
</style>
