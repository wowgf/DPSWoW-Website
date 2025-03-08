<template>
  <div class="flex flex-wrap gap-3">
    <div
      v-for="(item, index) in options"
      :key="index"
      :class="{ '!bg-wowDeepRed': item.value == modelValue }"
      class="cursor-pointer bg-[#291E15] px-3 py-2 rounded text-themeYellow"
      @click="onChange(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: {
    label: string;
    value: any;
  }[];
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const onChange = (item: { label: string; value: any }) => {
  emit("update:modelValue", item.value);
  emit("change", item.value);
};
</script>

<style></style>
