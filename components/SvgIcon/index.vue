<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color, fontSize: fontSize }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script  lang="ts" setup>
const props: any = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  fontSize: {
    type: String,
    default: "",
  },
});

const iconName: any = computed(() => `#icon-${props.name}`);
const svgClass: any = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return "svg-icon";
});
</script>

<style lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
