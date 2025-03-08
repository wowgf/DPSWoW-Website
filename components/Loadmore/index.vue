<template>
  <button class="loadmore" @click="toLoadMore">
    <slot>
      <div class="loader" v-if="loadingStatus == 'loading'"></div>
      {{ loadingText }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { debounce } from "lodash-es";
import { computed, onBeforeUnmount, ref } from "vue";
const props = defineProps({
  loadingStatus: {
    type: String,
    default: "loading", // loading-加载中 nomore-无更多数据 loadmore - 加载更多
  },
  // 是否到底后请求
  reachBottom: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 100,
  },
});

let scrollTop = ref(0);
const loadingText = computed(() => {
  switch (props.loadingStatus) {
    case "loading":
      return "加载中";
    case "loadmore":
      return "下拉加载更多";
    case "nomore":
      return "没有更多了哦~";
    default:
      return "加载更多";
  }
});
const emits = defineEmits(["loadmore"]);

const onScrollChange = debounce(() => {
  //滚动高度
  scrollTop.value =
    document.documentElement.scrollTop || document.body.scrollTop;
  //窗口高度
  var windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  //页面高度
  var documentHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  if (windowHeight + scrollTop.value >= documentHeight - props.offset) {
    if (props.reachBottom) toLoadMore(); // 如果已经到底部，则加载更多
  }
}, 200);

onMounted(() => {
  // window.addEventListener('scroll', onScrollChange)
});

// 移除滚动事件
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScrollChange);
});
// 加载更多
function toLoadMore() {
  if (props.loadingStatus !== "loadmore") return;
  emits("loadmore");
}
</script>

<style lang="scss" scoped>
.loadmore {
  width: 100%;
  cursor: pointer;
  padding: 14px;
  // background-color: #fff;
  color: #877a55;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px rgb(98 124 153 / 10%);

  .loader {
    margin-right: 10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(90deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
