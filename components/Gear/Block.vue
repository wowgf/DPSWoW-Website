<template>
  <div class="gear-block">
    <div
      ref="simcConfigBoxRef"
      id="simcConfigForm"
      class="flex justify-between cursor-pointer block-head"
      @click="toggleBlockVisible()"
    >
      <div class="block-label">
        <div class="flex items-center">
          <span class="text-gray-300">{{ label }}</span>
          <slot name="label-right"></slot>
        </div>

        <a-tooltip v-if="tooltip" mini position="right">
          <template #content>
            <div>{{ tooltip }}</div>
          </template>
          <icon-question-circle
            class="ml-1 cursor-pointer mt-[3px] text-gray-500"
            style="color: gray"
          />
        </a-tooltip>
      </div>
      <div class="flex">
        <slot name="head-right"> </slot>
        <div v-if="showArrow" class="ml-2">
          <icon-right :class="{ 'transform rotate-90': blockVisible }" />
        </div>
      </div>
    </div>
    <div v-show="blockVisible">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    visible?: boolean;
    label: string;
    tooltip?: string;
    showArrow?: boolean;
  }>(),
  {
    visible: false,
    showArrow: true,
  }
);

const blockVisible = ref(props.visible);

if (!props.showArrow) {
  blockVisible.value = true;
}

function toggleBlockVisible() {
  if (props.showArrow) blockVisible.value = !blockVisible.value;
}
</script>

<style lang="scss" scoped>
.block-head {
  margin-bottom: 1rem;
}

.block-label {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
</style>
