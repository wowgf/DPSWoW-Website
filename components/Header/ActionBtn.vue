<template>
  <button v-if="type == 'button'" :style="style" :class="[customClass]" class="header-action-btn" @click="onClick">
    <slot></slot>
  </button>
  <div v-if="type == 'text'" :style="style" :class="[customClass]" class="header-action-btn text-btn" @click="onClick">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  type?: 'button' | 'text';
  backgroundColor?: string;
  customClass?: string;
}>()

const type = props.type || 'button'
const backgroundColor = props.backgroundColor
const emits = defineEmits(['click'])
const style: any = {
  backgroundColor
}

function onClick (e: any) {
  emits('click', e)
}
</script>

<style lang="scss" scoped>
.header-action-btn {
  // padding: 5px 20px;
  // height: 35px;
  // line-height: 35px;
  // text-align: center;
  display: flex;
  align-items: center;
  border-radius: 6px;
  // border: 0 solid #999;
  // background-color: $mz-color-primary;
  // color: #fff;
  cursor: pointer;
  // box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 6px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  &.text-btn {
    padding: 0 10px;
    font-size: 16px;
    font-weight: 600;
    // color: rgb(78, 89, 105);

    &:hover {
      // background-color: #171B25;
    }
  }
}
</style>
