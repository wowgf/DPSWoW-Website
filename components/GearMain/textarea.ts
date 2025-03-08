import { ref, } from 'vue';

export function useTextarea() {
  const showClearBtn = ref(false);
  const isOnClearBtn = ref(false);
  const textareaRef = ref();

  function onFocus() {
    showClearBtn.value = true;
    if (textareaRef.value) {
      const textarea = textareaRef.value.$el.querySelector('textarea');

      if (textarea) {
        (textarea as HTMLTextAreaElement).select();
      }
    }
  }

  function onBlur() {
    if (isOnClearBtn.value) return;
    showClearBtn.value = false;
  }

  function onMouseOnClearBtn() {
    isOnClearBtn.value = true;
  }

  function onMouseOutClearBtn() {
    isOnClearBtn.value = false;
  }

  return {
    showClearBtn,
    isOnClearBtn,
    textareaRef,
    onFocus,
    onBlur,
    onMouseOnClearBtn,
    onMouseOutClearBtn
  };
}