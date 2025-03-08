// src/directives/clickOutside.js
const clickOutside = {
  mounted(el, binding) {
    // 定义点击事件回调
    el.clickOutsideHandler = (event) => {
      // 检查点击是否发生在目标元素外部
      if (!(el === event.target || el.contains(event.target))) {
        // 执行绑定的回调函数
        binding.value(event);
      }
    };

    // 监听全局点击事件
    document.addEventListener('click', el.clickOutsideHandler);
  },
  unmounted(el) {
    // 移除事件监听
    document.removeEventListener('click', el.clickOutsideHandler);
  },
};

export default clickOutside;
