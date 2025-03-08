<template>
  <Container>
    <div class="page--home">
      <div
        v-if="showNotice && param.notice?.status==1"
        class="px-[10px] py-[10px] font-semibold text-base text-center text-black rounded bg-green-400 relative"
      >
        {{ param.notice.content }}
        <button 
          @click="closeNotice" 
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mt-5"></div>
      <a-row :gutter="[20, 20]">
        <a-col v-for="(item, index) in menuList" :key="index" :lg="12" :xs="24">
          <nuxt-link :to="item.link">
            <div
              class="flex items-center gap-4 px-6 py-10 transition-colors border rounded-lg shadow-sm cursor-pointer text-card-foreground bg-slate-900 border-slate-900/50 hover:border-zinc-700"
            >
              <div class="flex items-center h-full text-5xl text-themeGreen">
                <SvgIcon :name="item.icon"></SvgIcon>
              </div>
              <div class="space-y-1">
                <h2
                  class="text-2xl font-semibold tracking-tight text-themeGreen"
                >
                  {{ item.label }}
                </h2>
                <p
                  class="text-base transition-colors text-zinc-400 group-hover:text-zinc-300"
                >
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useParam } from "~/cool/hook/param";
import { ref, watch, onMounted } from "vue";

const menuList = ref([
  {
    label: "快速模拟",
    desc: "一键模拟当前装备和天赋的DPS",
    icon: "qifei",
    link: "/gear/quick",
  },
  {
    label: "最佳装配",
    desc: "模拟多套装备、天赋的组合并找到最佳搭配",
    icon: "top",
    link: "/gear",
  },
  {
    label: "最大提升",
    desc: "找出当前版本大米、团本、制造业提升最大的装备",
    icon: "suiji",
    link: "/gear/drop",
  },
  {
    label: "低保推荐",
    desc: "帮你选择最佳的低保装备",
    icon: "tuijian",
    link: "/gear/weekly",
  },
  {
    label: "属性权重",
    desc: "为你的角色计算属性收益",
    icon: "ziyuan",
    link: "/gear/weight",
  },
  {
    label: "排行榜",
    desc: "查看其他玩家的DPS跑分排行和配装",
    icon: "rank",
    link: "/rank",
  },
]);

// 获取公告信息
const { param } = useParam(["notice"]);
const showNotice = ref(false);

const closedNoticeId = localStorage.getItem('closedNoticeId');
// 如果有公告并且ID与已关闭的ID匹配，则不显示公告
if (param?.notice?.id && closedNoticeId != param?.notice?.id.toString()) {
  showNotice.value = true;
}

// 监听公告变化，如果公告ID更新了，再次显示
watch(() => param?.notice?.id, (newId) => {
  const closedNoticeId = localStorage.getItem('closedNoticeId');
  if (newId && closedNoticeId !== newId.toString()) {
    showNotice.value = true;
  }
});

// 关闭公告的方法
const closeNotice = () => {
  showNotice.value = false;
  // 将当前公告ID保存到本地存储，以便记住哪些公告已被关闭
  if (param.notice?.id) {
    localStorage.setItem('closedNoticeId', param.notice?.id.toString());
  }
};
</script>

<style>
/* 可选：为关闭按钮添加一些悬停效果 */
.close-btn {
  transition: transform 0.2s;
}
.close-btn:hover {
  transform: scale(1.1);
}
</style>
