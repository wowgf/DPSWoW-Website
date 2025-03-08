<template>
  <PageItemCard hideBorder>
    <Layout label="模拟记录" class="page--dps-record">
      <div class="text-gray-400 text-[13px] mb-4">
        <icon-exclamation />因服务器资源有限，模拟数据最多保存1个月
      </div>
      <el-table :data="list">
        <el-table-column
          prop="playerInfo.playerName"
          label="角色"
          align="center"
        >
          <template #default="{ row }">
            <div
              :style="{ color: metierColorMap[row.playerInfo.metier]?.color }"
            >
              <span>{{ row.playerInfo.playerName }}</span>
              <span class="mx-1">-</span>
              <span>{{ metierColorMap[row.playerInfo.metier]?.name }}</span>
              <span class="mx-1">-</span>
              <span>{{ specrMap[row.playerInfo.spec] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dps" label="最佳DPS" align="center">
          <template #default="{ row }">
            <div v-if="row.status == 3">
              <span>{{ formatDpsValue(row.bestDps) }}</span>
              <span>万</span>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template #default="{ row }">
            <div>
              <span v-if="row.type == 1">最佳装配</span>
              <span v-if="row.type == 2">快速模拟</span>
              <span v-if="row.type == 3">属性权重</span>
              <span v-if="row.type == 4">低保推荐</span>
              <span v-if="row.type == 5">最大提升</span>
              <span v-if="row.type == 6">排行榜</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <div>
              <span>{{ statusMap[row.status] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="模拟时间"
          align="center"
          :width="170"
        ></el-table-column>
        <el-table-column label="操作" :width="80" align="center">
          <template #default="{ row }">
            <nuxt-link
              v-if="row.type == 1"
              :to="{ path: '/gear/result', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
            <nuxt-link
              v-if="row.type == 2"
              :to="{ path: '/gear/result/quick', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
            <nuxt-link
              v-if="row.type == 3"
              :to="{ path: '/gear/result/weight', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
            <nuxt-link
              v-if="row.type == 4"
              :to="{ path: '/gear/result/weekly', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
            <nuxt-link
              v-if="row.type == 5"
              :to="{ path: '/gear/result/drop', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
            <nuxt-link
              v-if="row.type == 6"
              :to="{ path: '/gear/result/rank', query: { id: row.id } }"
            >
              <a-link>查看</a-link>
            </nuxt-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end">
        <a-pagination
          v-bind="{
            current: pagination.page,
            pageSize: pagination.size,
            pageSizeOptions: [10, 20, 30],
            showPageSize: true,
            total: pagination.total,
          }"
          show-page-size
          class="mt-3"
          @change="(page: number) => currentChange(page)"
          @page-size-change="(pageSize: number) => {
            pagination.size = pageSize;
            currentChange(1);
          }"
        />
      </div>
    </Layout>
  </PageItemCard>
</template>

<script setup lang="ts">
import Layout from "@/components/user/Layout.vue";
import { usePage } from "~/cool";
import { metierColorMap, specrMap, metierMap } from "~/consts/wowData";
import { useDpsRecord } from "~/cool/hook/dpsRecord";
import { formatDpsValue } from "@/cool/utils/dps";
const { getDpsInfo } = useDpsRecord();
const { onFetch, list, currentChange, loadingStatus, loadmore, pagination } =
  usePage(refresh, {
    size: 10,
    longList: false,
  });

const statusMap: any = {
  1: "排队中",
  2: "运行中",
  3: "运行完成",
  9: "失败",
};

refresh();

function refresh(params: any = { page: 1 }) {
  onFetch(service.userSimcRecord.userPage, {
    ...params,
  });
}
</script>

<style lang="scss" scoped>
.page--dps-record {
}
</style>
