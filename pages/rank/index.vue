<template>
  <div class="h-full pb-5 page--rank bg-themeWowBg">
    <Container>
      <div class="text-3xl font-extrabold text-center text-orange-500">
        模拟DPS排行榜
      </div>
      <div class="flex flex-col gap-3 mt-5 filter-wrap">
        <div class="flex items-center filter-item">
          <div class="w-[60px] text-justify filter-label text-themeYellow">
            类型:
          </div>
          <div class="flex-1 overflow-hidden">
            <Options
              v-model="filterQuery.rankType"
              :options="typeOptions"
            ></Options>
          </div>
        </div>
        <div class="flex items-center filter-item">
          <div class="w-[60px] text-justify filter-label text-themeYellow">
            职业:
          </div>
          <div class="flex-1 overflow-hidden">
            <Options
              v-model="filterQuery.className"
              :options="metierList"
            ></Options>
          </div>
        </div>
        <div
          v-if="specialityList.length > 0"
          class="flex items-center filter-item filter-label text-themeYellow"
        >
          <div class="w-[60px]">专精:</div>
          <div class="flex-1 overflow-hidden">
            <Options
              v-model="filterQuery.spec"
              :options="specialityList"
            ></Options>
          </div>
        </div>
        <div
          class="flex items-center filter-item filter-label text-themeYellow"
        >
          <div class="w-[60px]">服务器:</div>
          <div class="flex items-center flex-1 overflow-hidden">
            <a-select
              v-model="filterQuery.serverName"
              :style="{ width: '200px' }"
              allow-search
              placeholder="请选择服务器"
            >
              <a-option
                v-for="(item, index) in serverList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></a-option>
            </a-select>
            <!-- <div class="inline-flex">
              <ShareTooltip miniPath="/pages/index/rank">
                <MzButton showIcon class="ml-3">
                  <template #icon>
                    <img
                      src="~/assets/icons/imgs/wechat.png"
                      class="bg-white rounded-full h-[18px] w-[18px]"
                    />
                  </template>
                  分享榜单给好友
                </MzButton>
              </ShareTooltip>

              <nuxt-link to="/gear/rank">
                <MzButton class="ml-3"> 我要跑分 </MzButton>
              </nuxt-link>
            </div> -->
          </div>
        </div>
      </div>

      <MyRank
        v-if="user.isLogin"
        :rank-type="filterQuery.rankType"
        class="mt-5"
      ></MyRank>

      <div class="mt-5 list-wrap">
        <div class="flex justify-between">
          <div class="flex gap-2 mb-5">
            <nuxt-link to="/gear/rank">
              <MzButton> 我也要跑分 </MzButton>
            </nuxt-link>
            <ShareTooltip miniPath="/pages/index/rank">
              <MzButton showIcon>
                <template #icon>
                  <img
                    src="~/assets/icons/imgs/wechat.png"
                    class="bg-white rounded-full h-[18px] w-[18px]"
                  />
                </template>
                分享排行榜
              </MzButton>
            </ShareTooltip>
          </div>
          <div>
            <a-button :disabled="loadingStatus == 'loading'" @click="refresh()">
              刷新
              <template #icon> <icon-refresh /> </template
            ></a-button>
          </div>
        </div>

        <el-table
          :data="tableList"
          v-loading="loadingStatus == 'loading'"
          empty-text="暂无数据"
          @row-click="(row) => toResult(row.simcRecordId)"
        >
          <el-table-column align="center" label="排名" width="80">
            <template #default="{ row }">
              <div class="flex items-center justify-center gap-2">
                <!-- 金牌 -->
                <SvgIcon
                  v-if="row.rank == 1"
                  name="jiangbei"
                  class="text-xl text-[#F8C51C]"
                ></SvgIcon>
                <!-- 银牌 -->
                <SvgIcon
                  v-if="row.rank == 2"
                  name="jiangbei"
                  class="text-xl text-[#B0B0B0]"
                ></SvgIcon>
                <!-- 铜牌 -->
                <SvgIcon
                  v-if="row.rank == 3"
                  name="jiangbei"
                  class="text-xl text-[#A67D3D]"
                ></SvgIcon>
                <span class="text-wowText">{{ row.rank }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="角色"
            prop="playerName"
            :width="150"
          >
            <template #default="{ row }">
              <nuxt-link
                :to="{
                  path: '/gear/result/quick',
                  query: { id: row.simcRecordId },
                }"
              >
                <span class="cursor-pointer text-themeYellow">
                  {{ row.characterName }}
                </span>
              </nuxt-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="服务器"
            prop="playerName"
            :width="120"
          >
            <template #default="{ row }">
              <span class="text-wowText">{{ row.serverName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="职业" :width="100">
            <template #default="{ row }">
              <span :style="{ color: row.metier ? row.metier.namecolor : '' }">
                {{ row.metier ? row.metier.name : "" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="专精" :width="100">
            <template #default="{ row }">
              <span :style="{ color: row.metier ? row.metier.namecolor : '' }">
                {{
                  row.metier &&
                  getSpecialityName(row.spec, row.metier.specializationList)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="装等"
            prop="gearLevel"
            :width="80"
          >
            <template #default="{ row }">
              <span class="text-wowText">
                {{ row.itemLevel }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="DPS">
            <template #default="{ row }">
              <div class="w-full h-[30px]">
                <div
                  :style="{
                    backgroundColor: row.metier?.namecolor,
                    width: (row.dps / firstDps) * 100 + '%',
                  }"
                  class="flex items-center h-full px-3 bg-yellow-50"
                >
                  <span
                    class="text-white"
                    style="text-shadow: 1px 1px 2px black"
                  >
                    {{ formatDpsValue(row.dps, 2, true) }}
                  </span>
                </div>
              </div>
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
            hide-on-single-page
            show-page-size
            class="mt-3"
            @change="(page: number) => currentChange(page)"
            @page-size-change="(pageSize: number) => {
            pagination.size = pageSize;
            currentChange(1);
          }"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Options from "~/components/Filter/Options.vue";
import MyRank from "~/components/MyRank/index.vue";
import { useJson } from "~/cool/hook/json";
import serverNames from "~/consts/serverNames";
import { usePage } from "~/cool";
import { formatDpsValue } from "~/cool/utils/dps";
import type { myRank } from "~/types/rank";
import { useUserStore } from "~/store/user";
import ShareTooltip from "~/components/ShareTooltip/index.vue";

const { json } = useJson(["metier"]);

const user = useUserStore();

const firstDps = ref(0);

const filterQuery = reactive({
  className: "",
  spec: "",
  serverName: "",
  rankType: 1,
});

const { onFetch, list, currentChange, loadingStatus, pagination } = usePage(
  refresh,
  {
    size: 20,
    longList: false,
  }
);

let myRankList = ref<myRank[]>([]);

const tableList = computed(() => {
  return list.value.map((item: any) => ({
    ...item,
    metier: getMetier(item.className),
  }));
});

const typeOptions = [
  { label: "单体DPS", value: 1 },
  { label: "群体DPS", value: 2 },
];

const metierList = computed(() => {
  let list: Metier[] = json.metier || [];
  const specList: any = [];
  const list2 = list.map((item) => ({
    name: item.name,
    namenick: item.namenick,
    namecolor: item.namecolor,
    specializationList: item.specializationList.map((spec) => {
      let a = {
        name: spec.specializationname,
        namenick: spec.namespec,
        namecolor: spec.namecolor,
      };
      specList.push(a);
      return a;
    }),
  }));

  return [
    { label: "全部", value: "", specializationList: [] },
    ...list.map((item) => ({
      label: item.name,
      value: item.namenick,
      ...item,
    })),
  ];
});

const specialityList = computed(() => {
  let list: Specialization[] =
    metierList.value.find((item) => item.value == filterQuery.className)
      ?.specializationList || [];

  if (list.length == 0) return [];
  return [
    { label: "全部", value: "" },
    ...list.map((item) => ({
      label: item.specializationname,
      value: item.namespec,
    })),
  ];
});

const serverList = computed(() => {
  let list: string[] = [];
  serverNames.forEach((item) => {
    list = list.concat(item);
  });

  return [
    { label: "全部", value: "" },
    ...list.map((item) => ({
      label: item,
      value: item,
    })),
  ];
});

watch(
  () => filterQuery.className,
  (newVal, oldVal) => {
    filterQuery.spec = "";
  },
  { deep: true }
);

watch(
  () => filterQuery,
  (newVal, oldVal) => {
    refresh();
  },
  { deep: true }
);

watch(
  () => list.value,
  () => {
    if (list.value.length > 0 && firstDps.value == 0) {
      firstDps.value = list.value[0]?.dps;
    }
  }
);

refresh();

function refresh(params: any = { page: 1 }) {
  onFetch(service.rank.getDpsTopRankPage, {
    ...params,
    ...filterQuery,
  });
}

function getMyRank() {
  service.rank.getMyRank().then((res) => {
    myRankList.value = res;
  });
}

function getMetier(namenick: string) {
  let metier = metierList.value.find((item) => item.value == namenick);
  return metier;
}

function getSpecialityName(namenick: string, options: Specialization[]) {
  let speciality = options.find((item) => item.namespec == namenick);
  return speciality ? speciality.specializationname : "";
}

function toResult(simcRecordId: string) {
  useRouter().push({
    path: "/gear/result/quick",
    query: { id: simcRecordId },
  });
}
</script>

<style lang="scss">
.page--rank {
  --primary-1: 255, 253, 232 !important;
  --primary-2: 254, 244, 185 !important;
  --primary-3: 252, 233, 138 !important;
  --primary-4: 251, 219, 91 !important;
  --primary-5: 249, 202, 45 !important;
  --primary-6: 248, 183, 0 !important;
  --primary-7: 205, 144, 0 !important;
  --primary-8: 162, 108, 0 !important;
  --primary-9: 119, 76, 0 !important;
  --primary-10: 77, 46, 0 !important;
  background-image: url("~/assets/images/bg/wow-bg.jpg");
  background-size: cover;
  background-position: center;
}
.el-table th.el-table__cell {
  background-color: rgba(255, 255, 255, 0.04) !important;
  // color: #f8b700;
}
// 12110F
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background-color: red !important;
}

.el-table tr {
  // background-color: #170f0f !important;
  background-color: rgba(255, 255, 255, 0.04) !important;
  cursor: pointer;
}
.el-table--striped .el-table__body td.el-table__cell {
  // background-color: #0e0d0c !important;
  // background-color: red !important;
}
</style>
