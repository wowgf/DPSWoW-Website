<template>
  <Container>
    <div class="overflow-hidden page--user">
      <a-row :gutter="30">
        <a-col :lg="4" :md="24" class="hidden-md-and-down">
          <div class="page--user__left">
            <!-- 移动端隐藏 -->
            <div class="menu-box">
              <div
                v-for="(item, index) in menuList"
                :key="index"
                :class="{ active: item.type == activeType }"
                class="menu-item"
                @click="onClickMenuItem(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :xs="24" class="hidden-md-and-up">
          <div class="page--user__left">
            <!-- 移动端显示 -->
            <div class="overflow-x-auto menu-box menu-box-m">
              <div
                v-for="(item, index) in menuList"
                :key="index"
                :class="{ active: item.type == activeType }"
                class="menu-item text-nowrap"
                @click="onClickMenuItem(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </a-col>
        <a-col :lg="20" :sm="24" :xs="24">
          <div class="page--user__right">
            <nuxt-page />
          </div>
        </a-col>
      </a-row>
    </div>
  </Container>
</template>

<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
definePageMeta({
  middleware: ["auth"],
});

const menuList = computed(() => {
  return [
    {
      label: "个人资料",
      type: "profile",
      link: "profile",
    },
    {
      label: "模拟记录",
      type: "record",
      link: "record",
    },
  ];
});

const route = useRoute();

const activeType = computed(() => {
  return route.name?.toString().split("-").pop();
});

function onClickMenuItem(item: { type: string; link: string }) {
  navigateTo(item.link);
}
</script>

<style lang="scss" scoped>
.page--user {
  .page--user__left {
    margin-bottom: 20px;

    .menu-box-m {
      display: flex;
      padding-left: 20px !important;
      .menu-item {
        margin-right: 10px;
      }
    }

    .menu-box {
      background-color: #111218;
      border-radius: 12px;
      padding: 20px 40px;

      .menu-item {
        padding: 10px 0;
        cursor: pointer;
        transition: all 0.3s;
        color: #999;

        &:hover {
          // color: $mz-color-primary;
        }

        &.active {
          color: $themeColor;
          font-weight: bold;
        }
      }
    }
  }

  .page--user__right {
    flex: 1;
    // background-color: #fff;
    // background-color: #111218;
    // margin-left: 30px;
    // padding: 20px;
    // border-radius: 12px;
  }
}
</style>
