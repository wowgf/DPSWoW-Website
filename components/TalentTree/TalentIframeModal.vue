<template>
  <a-modal v-model:visible="visible" :title="title" :width="width" :unmount-on-close="true" @cancel="handleCancel">
    <div class="iframe-container">
      <iframe 
        v-if="visible" 
        :src="iframeSrc" 
        frameborder="0" 
        :style="{
          width: `${100 / scale}%`,
          height: `${80 / scale}vh`,
          transform: `scale(${scale})`,
          transformOrigin: '0 0'
        }"
      ></iframe>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: number | string
  talentStr?: string
  scale?: number // 新增缩放比例属性
}

const props = withDefaults(defineProps<Props>(), {
  title: '天赋预览',
  width: '80%',
  talentStr: '',
  scale: 0.8 // 默认缩放比例
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const iframeSrc = computed(() => {
  const baseUrl = 'https://talent-tree.maiziit.cn/'
  // const baseUrl = 'http://localhost:3000/'
  if (!props.talentStr) return baseUrl
  return `${baseUrl}?talentStr=${encodeURIComponent(props.talentStr)}`
})

const handleCancel = () => {
  visible.value = false
}
</script>

<style scoped>
.iframe-container {
  overflow: hidden;
  width: 100%;
  height: 80vh;
}
</style>
