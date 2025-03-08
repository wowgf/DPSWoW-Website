<template>
  <div class="relative inline-block">
    <button
      @click="handleInviteClick"
      class="px-6 py-2 font-bold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
    >
      求邀请码+1
    </button>
    <TransitionGroup name="float" tag="div">
      <div
        v-for="animation in animations"
        :key="animation.id"
        class="absolute text-lg font-bold text-white float-animation"
        :style="{ bottom: '100%', left: `${animation.x}px` }"
      >
        +1
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { REQUEST_INVITE_CODE } from "~/consts/trackEvent";
import { debounce } from "lodash";

const animations = ref([]);
let animationCount = 0;

const recordLog = debounce(() => {
  service.track.fetchRecord({ event: REQUEST_INVITE_CODE });
}, 1000);

const handleInviteClick = (event) => {
  alert(`关注公众号【魔兽工坊】，回复"邀请码"即可获取`);
  
  recordLog();
  const x = event.offsetX;
  animationCount++;

  animations.value.push({
    id: animationCount,
    x,
  });

  setTimeout(() => {
    animations.value = animations.value.filter((a) => a.id !== animationCount);
  }, 1000);

};
</script>

<style scoped>
.float-animation {
  animation: float 1s forwards;
}

@keyframes float {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
