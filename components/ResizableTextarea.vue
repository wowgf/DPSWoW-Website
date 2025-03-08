<!-- components/ResizableTextarea.vue -->
<template>
  <div
    class="resizable-textarea-wrapper"
    :class="{ 'is-focused': isFocused }"
    :style="wrapperStyle"
  >
    <textarea
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="resizable-textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :style="textareaStyle"
      v-bind="$attrs"
    ></textarea>
    <div class="resize-detector"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: String,
  disabled: Boolean,
  rows: {
    type: Number,
    default: 4,
  },
  focusBorderColor: {
    type: String,
    default: "#409eff",
  },
});

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const textareaRef = ref(null);
const isFocused = ref(false);

const textareaStyle = computed(() => {
  return {
    minHeight: `${props.rows * 22 + 4}px`, // 假设每行高度为22px
    lineHeight: "22px",
  };
});

const wrapperStyle = computed(() => {
  return {
    "--focus-border-color": props.focusBorderColor,
  };
});

const handleInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("input", e.target.value, e);
};

const handleFocus = (e) => {
  isFocused.value = true;
  onFocus();
  emit("focus", e);
};

const handleBlur = (e) => {
  isFocused.value = false;
  emit("blur", e);
};

function onFocus() {
  if (textareaRef.value) {
    textareaRef.value.select();
  }
}

// 公开方法
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
});
</script>

<style scoped>
.resizable-textarea-wrapper {
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s;
}

.resizable-textarea-wrapper.is-focused {
  border-color: var(--focus-border-color);
}

.resizable-textarea {
  width: 100%;
  padding: 4px 12px;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: inherit;
  color: rgba(255, 255, 255, 0.85);
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
}
</style>
