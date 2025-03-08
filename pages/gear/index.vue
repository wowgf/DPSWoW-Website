<template>
  <div
    class="flex menu-wrap top-16 z-20 bg-[#030812] container mx-auto border-b border-themeGreen mt-2 mb-1"
  >
    <div
      :class="[
        'menu-item',
        { 'bg-themeGreen !text-slate-900': item.link === route.path },
      ]"
      class="px-3 py-2 text-[15px] cursor-pointer menu-item text-themeGreen font-semibold"
      v-for="item in menuList"
      :key="item.type"
      @click="onMenuClick(item.link)"
    >
      {{ item.label }}
    </div>
  </div>
  <Container>
    <nuxt-page />
  </Container>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const menuList = [
  {
    label: "快速模拟",
    type: "quick",
    link: "/gear/quick",
  },
  {
    label: "最佳装配",
    type: "index",
    link: "/gear",
  },
  {
    label: "最大提升",
    type: "best",
    link: "/gear/drop",
  },
  {
    label: "低保推荐",
    type: "weekly",
    link: "/gear/weekly",
  },
  {
    label: "属性权重",
    type: "weight",
    link: "/gear/weight",
  },
];

function onMenuClick(link: string) {
  router.push(link);
}
</script>
<style lang="scss" scoped>
.page--home {
  .block-label {
    font-size: 18px;
    margin-bottom: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .scroll-tip-wrap {
    // position: relative;
    .tip-icon {
      animation: smoothMove 1s infinite;
    }
  }

  @keyframes smoothMove {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>

<style></style>
