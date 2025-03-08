<template>
  <div class="page--home pb-[100px]">
    <div class="flex flex-wrap justify-between text-sm text-gray-300">
      <div>
        <span>使用</span>
        <a
          href="https://wowui.178.com/ui/915"
          target="_blank"
          class="text-yellow-400"
        >
          SimulationCraft插件
        </a>
        <span>导出数据并粘贴至下方。</span>
        <a
          href="https://maizikeji.feishu.cn/docx/G2ckdRyvNoHkuLx5iJGcLXYynkc?from=from_copylink"
          target="_blank"
          class="text-yellow-400"
        >
          如何安装和使用SimulationCraft插件？
        </a>
      </div>
      <div v-if="showExampleBtn">
        <span>先不安装？点击</span>
        <a @click="onClickUseExampleData()" class="cursor-pointer text-themeRed"
          >使用样例数据</a
        >
      </div>
    </div>
    <div id="contentInputBox" class="mt-3 input-box">
      <!-- <a-textarea
        ref="textareaRef"
        v-model="content"
        placeholder="ctrl + v 在此粘贴数据"
        :auto-size="{ maxRows: 4 }"
        @input="onContentChange"
        @focus="onFocus()"
        @blur="onBlur()"
        style="background-color: #2b2c2e; min-height: 96px; resize: vertical"
      ></a-textarea> -->
      <ResizableTextarea
        v-model="content"
        placeholder="ctrl + v 在此粘贴数据"
        allow-clear
        :rows="4"
        focus-border-color="#4AA3DF"
        @input="onContentChange"
        @focus="onFocus()"
        @blur="onBlur()"
        style="background-color: #2b2c2e"
      />
      <div class="flex justify-between mt-1">
        <CharacterSelect
          v-model="content"
          @change="onContentChange"
        ></CharacterSelect>
        <div>
          <a-link
            v-if="showClearBtn && !!content"
            @click="onClearContent()"
            @mouseenter="onMouseOnClearBtn()"
            @mouseleave="onMouseOutClearBtn()"
          >
            清除数据
          </a-link>
        </div>
      </div>
    </div>

    <div
      v-if="validText && content"
      :class="{
        'bg-red-500': validText.type == 'danger',
        'bg-themeYellow': validText.type == 'warning',
      }"
      class="w-full p-3 mt-3 font-bold text-black rounded"
    >
      <icon-exclamation-circle-fill />
      <span class="ml-1">{{ validText.text }}</span>
    </div>
    <BlockLine v-if="parseSuccess" class="mt-2"></BlockLine>

    <div v-if="parseSuccess" class="player-info">
      <div
        id="playerInfoBox"
        :style="{ color: metierMap.get(roleInfo.metier)?.namecolor }"
        class="text-[#23CD9F] text-base font-semibold"
      >
        <!-- 80 Orc Arms Warrior -->
        <span>{{ roleInfo.playerName }}</span>
        <span class="ml-1">/</span>
        <span class="ml-1">{{ getRace(roleInfo.race) }} -</span>
        <span class="ml-1">{{ metierMap.get(roleInfo.metier)?.name }} -</span>
        <span class="ml-1">{{
          specMap.get(roleInfo.spec)?.specializationname
        }}</span>
        <span>（{{ currentItemLevel }}）</span>
      </div>
      <div class="mt-1">
        <div
          v-for="(key, index) in [...options[1], ...options[0]]"
          :key="index"
          class="icon-box h-[25px] w-[25px] z-1 relative inline-flex mr-2"
        >
          <GearImg
            v-if="currentGear[key]"
            :src="currentGear[key].iconUrl || currentGear[key].icon_url"
            :data="currentGear[key]"
            :quality="currentGear[key].quality"
            :level="currentGear[key].gearLevel"
            :show-border="false"
            hideMask
            hideLevel
          ></GearImg>
        </div>
        <div class="mt-3 md:pr-20">
          <TalentDisplay v-if="roleInfo.talents" :talentStr="roleInfo.talents">
          </TalentDisplay>
        </div>
      </div>
    </div>
    <div v-if="!parseSuccess" class="h-[220px] flex flex-col justify-center">
      <p v-if="!parseLoading" class="leading-normal text-center text-gray-400">
        {{ props.emptyBoxText1 }}
      </p>
      <p v-if="!parseLoading" class="text-center text-gray-400">
        {{ props.emptyBoxText2 }}
      </p>
      <div
        v-if="parseLoading"
        class="mt-3 gear-wrap bg-[#2B2C2E] flex h-full justify-center items-center"
      >
        <span>数据解析中... 请稍等</span>
      </div>
    </div>
    <!-- <div
      v-if="isError && content.trim()"
      class="px-5 py-4 error-tip bg-[#13100D] mt-1 text-red-500"
    >
      ⚠️数据解析错误，请使用SimulationCraft插件复制的数据
    </div> -->
    <slot :gearData="gearData" :roleInfo="roleInfo"></slot>
    <template v-if="parseSuccess">
      <BlockLine v-if="showItemSearch"></BlockLine>
      <ItemSearch v-if="showItemSearch"></ItemSearch>
      <BlockLine v-if="showGear"></BlockLine>
      <div v-if="showGear" ref="gearBoxRef" id="gearBox" class="block-label">
        <span>装备配置</span>
        <a-tooltip
          :content-style="{ maxWidth: '400px' }"
          mini
          position="right"
          trigger="hover"
        >
          <template #content>
            <div>选择低保（宏伟宝库）和背包中的装备和自身装备进行对比</div>
          </template>
          <icon-question-circle
            class="ml-1 cursor-pointer mt-[3px]"
            style="color: gray"
          />
        </a-tooltip>
      </div>
      <GearBox
        v-if="showGear"
        :options="options"
        :checkIsSelected="checkIsSelected"
        :currentGear="currentGear"
        :onSelect="onSelect"
        :gearData="gearData"
      ></GearBox>

      <BlockLine v-if="showEnchant"></BlockLine>

      <Block
        v-if="showEnchant"
        label="附魔"
        tooltip="为所有对应部位的装备添加附魔"
      >
        <EnchantSelect @change="onEnchantChange"> </EnchantSelect>
      </Block>

      <BlockLine v-if="showGem"></BlockLine>
      <Block
        v-if="showGem"
        label="宝石"
        tooltip="为所有带有插槽的装备镶嵌所选宝石"
      >
        <GemSelect @change="onGemChange"></GemSelect>
      </Block>
      <BlockLine></BlockLine>

      <Block label="Buff消耗品" tooltip="选择战斗时的增益效果">
        <div class="bg-[#111218] p-3">
          <a-form layout="inline">
            <a-form-item :label-col-style="{ width: '80px' }" label="增益BUFF">
              <BuffSelect
                v-model="selectBuffList"
                :list="buffList"
              ></BuffSelect>
            </a-form-item>
          </a-form>
          <a-form layout="inline">
            <a-form-item :label-col-style="{ width: '75px' }" label="药水">
              <a-select
                v-model="consumables.potion"
                :style="{ width: '220px' }"
                default-active-first-option
              >
                <a-option
                  v-for="(item, index) in [
                    { name_cn: '默认', value: 0, itemId: null },
                    ...selectOptions.potions,
                    { name_cn: '不使用', value: 'disabled' },
                  ]"
                  :key="index"
                  :value="item.value"
                  :label="item.name_cn"
                >
                  <div v-if="item.itemId" class="flex items-center">
                    <div class="w-6 h-6">
                      <GearItemImg
                        :src="`${iconImgBaseUrl}/${item.icon}.png`"
                        :itemId="item.itemId"
                        :crafting-quality="item.craftingQuality"
                        :quality="4"
                      ></GearItemImg>
                    </div>
                    <div class="flex-1 overflow-hidden">
                      <span class="ml-2">{{ item.name_cn }}</span>
                      <span class="ml-1">({{ item.craftingQuality }}星)</span>
                    </div>
                  </div>
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item :label-col-style="{ width: '75px' }" label="食物">
              <a-select v-model="consumables.food" :style="{ width: '220px' }">
                <a-option
                  v-for="(item, index) in [
                    { name_cn: '默认', value: 0, itemId: null },
                    ...selectOptions.foods.filter(
                      (item) => item.expansion == 10
                    ),
                    { name_cn: '不使用', value: 'disabled' },
                  ]"
                  :key="index"
                  :value="item.value"
                  :label="item.name_cn"
                >
                  <div v-if="item.itemId" class="flex items-center">
                    <div class="w-6 h-6">
                      <GearItemImg
                        :src="`${iconImgBaseUrl}/${item.icon}.png`"
                        :itemId="item.itemId"
                        :crafting-quality="item.craftingQuality"
                        :quality="4"
                      ></GearItemImg>
                    </div>
                    <div>
                      <span class="ml-2">{{ item.name_cn }}</span>
                    </div>
                  </div>
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item :label-col-style="{ width: '75px' }" label="合剂">
              <a-select v-model="consumables.flask" :style="{ width: '220px' }">
                <a-option
                  v-for="(item, index) in [
                    { name_cn: '默认', value: 0, itemId: null },
                    ...selectOptions.flasks.filter(
                      (item) => item.craftingQuality == 3
                    ),
                    { name_cn: '不使用', value: 'disabled' },
                  ]"
                  :key="index"
                  :value="item.value"
                  :label="item.name_cn"
                >
                  <div v-if="item.itemId" class="flex items-center">
                    <div class="w-6 h-6">
                      <GearItemImg
                        :src="`${iconImgBaseUrl}/${item.icon}.png`"
                        :itemId="item.itemId"
                        :crafting-quality="item.craftingQuality"
                        :quality="4"
                      ></GearItemImg>
                    </div>
                    <div class="flex-1 overflow-hidden">
                      <span class="ml-2">{{ item.name_cn }}</span>
                      <span class="ml-1">({{ item.craftingQuality }}星)</span>
                    </div>
                  </div>
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item :label-col-style="{ width: '75px' }" label="强化符文">
              <a-select
                v-model="consumables.augmentation"
                :style="{ width: '220px' }"
              >
                <a-option
                  v-for="(item, index) in [
                    { name_cn: '默认', value: 0, itemId: null },
                    ...selectOptions.augmentationRunes,
                    { name_cn: '不使用', value: 'disabled' },
                  ]"
                  :key="index"
                  :value="item.value"
                  :label="item.name_cn"
                >
                  <div v-if="item.itemId" class="flex items-center">
                    <div class="w-6 h-6">
                      <GearItemImg
                        :src="`${iconImgBaseUrl}/${item.icon}.png`"
                        :itemId="item.itemId"
                        :crafting-quality="item.craftingQuality"
                        :quality="3"
                      ></GearItemImg>
                    </div>
                    <div>
                      <span class="ml-2">{{ item.name_cn }}</span>
                    </div>
                  </div>
                </a-option>
              </a-select>
            </a-form-item>

            <a-form-item :label-col-style="{ width: '75px' }" label="武器符文">
              <a-select
                v-model="consumables.weapon"
                :style="{ width: '320px' }"
              >
                <a-option
                  v-for="(item, index) in [
                    { name_cn: '默认', value: 0 },
                    ...selectOptions.weaponRunes,
                    { name_cn: '不使用', value: 'disabled' },
                  ]"
                  :key="index"
                  :value="item.value"
                  :label="item.name_cn"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </Block>
      <BlockLine v-if="showTalent"></BlockLine>
      <Block
        v-if="showTalent"
        ref="simcConfigBoxRef"
        :visible="true"
        label="天赋"
        tooltip="选择不同的天赋进行组合"
      >
        <TalentSelect
          v-show="blockVisible.talent"
          v-model="selectTalentsList"
          :list="talentsList"
          @change="onTalentsChange"
        ></TalentSelect>
      </Block>
    </template>

    <template v-if="1 == 1">
      <BlockLine></BlockLine>
      <Block
        ref="simcConfigBoxRef"
        :visible="true"
        label="战斗设置"
        tooltip="选择不同的战斗场景，模拟更真实的DPS数据"
      >
        <SimcConfig
          :defaultConfigType="defaultConfigType"
          :onlyRankSimcConfig="onlyRankSimcConfig"
          @select="onSelectPreset"
        ></SimcConfig>
        <div
          v-if="
            canUploadToRank({ ...simcConfig }, isSourceSimcStr, isDefaultStr) &&
            showRankTip &&
            content != wowContent
          "
          class="mt-2 text-yellow-500"
        >
          {{ rankTipText }}
        </div>
      </Block>

      <template v-if="allCombinations.length > 0 && parseSuccess && showComb">
        <BlockLine></BlockLine>
        <div
          ref="combListRef"
          id="gearCombinationTableLabelId"
          class="block-label"
        >
          <span>装备组合</span>
          <a-tooltip mini position="right">
            <template #content>
              <div>由上方装备选择生成的所有装备组合，将模拟每种组合的DPS</div>
            </template>
            <icon-question-circle
              class="ml-1 cursor-pointer mt-[3px]"
              style="color: gray"
            />
          </a-tooltip>
        </div>
        <div
          id="gearCombinationTableId"
          class="bg-[#111218] p-3 overflow-x-auto"
        >
          <GearTable
            :allCombinations="allCombinations"
            :tableHeadOptions="tableHeadOptions"
            :gearNameMap="gearNameMap"
            :isCurrentComb="isCurrentComb"
            :onRemoveComb="onRemoveComb"
          ></GearTable>
        </div>
      </template>

      <div
        ref="actionRef"
        class="sticky bottom-0 mt-8 action-wrap bg-[#030812] py-3 border-t-[1px] border-t-[#4e535c] z-10"
      >
        <div v-if="needPoints > 0" class="mb-3">
          <span class="mr-1">消耗积分：</span>
          <div class="text-xl text-[#23D3A4] inline-flex">
            <div class="font-bold">
              <span>{{ needPoints }}</span>
              <span class="mx-1">/</span>
              <span>{{ userInfo?.points }}</span>
            </div>
            <span class="text-[16px]">（</span>
            <span class="font-bold mx-[2px]">
              {{ allComboNum }}
            </span>
            <span class="text-[16px]">种组合）</span>
            <!-- <span class="text-yellow-400 cursor-pointer text-[13px]">获取积分</span> -->
          </div>
          <div class="text-sm text-gray-400">
            （每1种组合消耗{{ needPoints }}积分）
            <GetPoints>
              <span class="text-yellow-500 cursor-pointer text-[14px]">
                获取积分
              </span>
            </GetPoints>
          </div>
        </div>
        <div v-else-if="showCombNum" class="mb-3 text-xl text-themeGreen">
          <span class="text-[16px]">已选择</span>
          <span class="font-bold mx-[2px]">
            {{ allComboNum }}
          </span>
          <span class="text-[16px]">种组合</span>
        </div>
        <div>
          <a-button
            type="primary"
            size="large"
            :loading="runLoading"
            :style="{ padding: '20px 80px', fontSize: '16px' }"
            :disabled="runDisabled"
            @click="onRun()"
          >
            开始模拟
          </a-button>
          <span v-if="runDisabled" class="ml-3 text-yellow-400">
            {{ disabledTipContent }}
          </span>
          <span
            v-if="allCombinations.length > maxCombNum"
            class="ml-2 text-blue-600 cursor-pointer"
            @click="scrollTo('gearBox')"
          >
            去删除
          </span>
        </div>
        <!-- 如果没有使用过则显示 -->
        <div
          v-if="showToBottom&&!hideToBottom"
          class="absolute flex justify-center w-full bottom-2 scroll-tip-wrap"
        >
          <icon-down
            class="text-4xl cursor-pointer tip-icon"
            @click="scrollTo('gearCombinationTableLabelId')"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { cloneDeep } from "lodash";
import { GearNameMap } from "~/consts/wowItem";
import {
  wowContent,
  parseDocument,
  getRace,
  getUpgradeInfoByBonusId,
  calculateGearLevel,
} from "~/cool/utils/wow";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
import type {
  Gear,
  GearData,
  GearItem,
  ItemEnchantCombo,
  ItemEnchantSelectValue,
  RoleInfo,
} from "~/types/gear";
import BlockLine from "../Gear/BlockLine.vue";
import GearBox from "@/components/GearBox/GearBox5.vue";
import GearTable from "@/components/GearTable/index.vue";
import TalentDisplay from "~/components/TalentTree/TalentDisplay.vue";
import { set, get } from "~/cool/utils/storage";
import { STORAGE_KEY } from "~/consts";
import { useDict } from "~/cool";
import { useTextarea } from "./textarea";
import Block from "~/components/Gear/Block.vue";
import EnchantSelect from "~/components/Gear/EnchantSelect.vue";
import GemSelect from "~/components/Gear/GemSelect.vue";
import BuffSelect from "~/components/Gear/BuffSelect.vue";
import TalentSelect from "~/components/Gear/TalentSelect.vue";
import SimcConfig from "~/components/Gear/SimcConfig.vue";
import ResizableTextarea from "~/components/ResizableTextarea.vue";
import CharacterSelect from "../Gear/CharacterSelect.vue";
import ItemSearch from "../Gear/ItemSearch.vue";
import {
  PARSE_DATA,
  START_SIMULATION,
  CLICK_USE_EXAMPLE_DATA,
} from "~/consts/trackEvent";
import { useWowDataStore } from "~/store/wowData";
import socketMap from "~/consts/socket";
import { useMitt } from "~/cool/hook/mitt";
import { ADD_NEW_GEAR } from "~/consts/windowEmits";
import GearItemImg from "~/components/Gear/ItemImg.vue";
import { useGear } from "./gear";
import { useRank } from "~/cool/hook/rank";
import { useMetier } from "~/cool/hook/metier";

const props = withDefaults(
  defineProps<{
    // 是否显示装备组合
    showComb: boolean;
    // 是否显示装备配置
    showGear: boolean;
    // 是否显示组合数量
    showCombNum: boolean;
    // 是否显示附魔
    showEnchant: boolean;
    // 是否显示宝石
    showGem: boolean;
    // 是否显示天赋
    showTalent: boolean;
    // 是否为单独组合
    isSingleComb: boolean;
    // 解析的数据来源
    sourceSlots: string[];
    // 是否禁止运行
    disabledRun: boolean;
    //  禁止运行的提示内容
    disabledRunContent?: string;
    // 默认战斗配置
    defaultConfigType?: any;
    // 排行类型
    onlyRankSimcConfig?: boolean;
    // 是否显示排行榜提示
    showRankTip?: boolean;
    // 是否显示示例按钮
    showExampleBtn?: boolean;
    // 排行榜提示内容
    rankTipText?: string;
    // 是否显示物品搜索
    showItemSearch?: boolean;
    // input下面的提示内容
    emptyBoxText1?: string; // 第一行文本
    emptyBoxText2?: string; // 第二行文本
    hideToBottom?: boolean; // 是否隐藏底部按钮
  }>(),
  {
    showComb: false,
    showGear: false,
    showCombNum: false,
    isSingleComb: false,
    showEnchant: false,
    showGem: false,
    showTalent: false,
    sourceSlots: () => ["bag", "current", "weekly"],
    disabledRun: false,
    showExampleBtn: true,
    rankTipText: "",
    emptyBoxText1:
      "粘贴数据至上方输入框，将会解析出你背包、低保（宏伟宝库）中的装备",
    emptyBoxText2:
      "选择不同的装备组合，将会模拟每个组合的DPS，并计算出一个伤害打的最高的配装",
    hideToBottom: true,
  }
);

const { metierMap, specMap } = useMetier();

const { dict } = useDict([
  "fightStyleOptions",
  "desiredTargetOptions",
  "maxTimeOptions",
  "buffs",
  "potions",
  "foods",
  "flasks",
  "augmentationRune",
  "weaponRune",
]);

const showTour = ref(true);
const {
  showClearBtn,
  onBlur,
  onFocus,
  onMouseOnClearBtn,
  onMouseOutClearBtn,
  textareaRef,
} = useTextarea();

const content = ref("");
const parseLoading = ref(false);
const parseSuccess = ref(false);
const runLoading = ref(false);
const isError = ref(false);
const app = storeToRefs(useAppStore());
const { info: userInfo } = storeToRefs(useUserStore());
const wowdataStore = useWowDataStore();
const { canUploadToRank } = useRank();

const hadUseGear = ref(get(STORAGE_KEY.HAD_USE_GEAR_PAGE) || false);

const { selectOptions } = useGear();

const simcConfigBoxRef = ref();
const gearBoxRef = ref();
const combListRef = ref();
const actionRef = ref();

const contentChecksum = ref<string>();
const validInfo = ref<{
  invalidChecksum: boolean;
  invalidMainBodyChecksum: boolean;
  validSource: boolean;
  validVersion: boolean;
}>(); // 是否是原始的simc文本

const iconImgBaseUrl = `${
  (import.meta as any).env.VITE_OSS_HOST
}/wow/images/icons`;

// 相关模块是否显示
const blockVisible = reactive({
  enchant: false,
  gem: false,
  talent: true,
  buff: false,
});

// 部位装备集合
const gearData = reactive<Gear>({
  head: [],
  neck: [],
  shoulder: [],
  back: [],
  chest: [],
  wrist: [],
  hands: [],
  waist: [],
  legs: [],
  feet: [],
  main_hand: [],
  off_hand: [],
  rings: [],
  finger1: [],
  finger2: [],
  trinkets: [],
  trinket1: [],
  trinket2: [],
});
const allCombinations = ref<GearItem[]>([]);
// 每个位置选择的装备
const formValues = reactive<{ [property: string]: GearData[] }>({
  head: [], // [1,2,3,4]
  neck: [], // [1,2,3,4]
  shoulder: [], // [1,2,3,4]
  back: [], // [1,2,3,4]
  chest: [], // [1,2,3,4]
  wrist: [], // [1,2,3,4]
  hands: [], // [1,2,3,4]
  waist: [], // [1,2,3,4]
  legs: [], // [1,2,3,4]
  feet: [], // [1,2,3,4]
  main_hand: [], // [1,2,3,4]
  off_hand: [], // [1,2,3,4]
  finger1: [], // [1,2,3,4]
  finger2: [], // [1,2,3,4]
  trinket1: [], // [1,2,3,4]
  trinket2: [], // [1,2,3,4]
});
// 选择的附魔物品
// 定义选中列表
const selectedEnchants = ref<ItemEnchantSelectValue>({
  head: [],
  neck: [],
  shoulder: [],
  back: [],
  chest: [],
  wrist: [],
  hands: [],
  waist: [],
  legs: [],
  feet: [],
  main_hand: [],
  off_hand: [],
  rings: [],
  trinkets: [],
});

// 选择的宝石
const selectGemList = ref<number[]>([]);

const fightFormRef = ref();

const simcConfig = reactive<any>({
  fight_style: undefined,
  desired_targets: undefined,
  max_time: undefined,
});

const options: any[] = [
  [
    "head",
    "neck",
    "shoulder",
    "back",
    "chest",
    "wrist",
    "main_hand",
    "off_hand",
  ],
  [
    "hands",
    "waist",
    "legs",
    "feet",
    "finger1",
    "finger2",
    "trinket1",
    "trinket2",
  ],
];

// buff列表
const buffList = computed(() => {
  return (dict.buffs || []).map((v) => {
    let config = v.remark ? JSON.parse(v.remark) : {};

    return {
      name: v.name,
      value: v.value,
      isDefault: config.isDefault,
      desc: config.desc,
    };
  });
});

// 表格配置
const tableHeadOptions = [
  "head",
  "neck",
  "shoulder",
  "back",
  "chest",
  "wrist",
  "hands",
  "waist",
  "legs",
  "feet",
  "finger1",
  "finger2",
  "trinket1",
  "trinket2",
  "main_hand",
  "off_hand",
  // "talents",
];

// 部位名称
const gearNameMap: any = GearNameMap;

let roleInfo: RoleInfo = {
  playerName: "",
  metier: "",
  paladin: "",
  level: "",
  race: "human",
  region: "",
  server: "",
  role: "",
  professions: "",
  spec: "",
  talents: "",
  talentsList: [],
};

const selectPresetIndex = ref<number>();

// 选择的buff
const selectBuffList = ref<string[]>([]);

// 选择的耗材
const consumables = reactive<{
  food: string | undefined | number;
  flask: string | undefined | number;
  potion: string | undefined | number;
  augmentation: string | undefined | number;
  weapon: string | undefined | number;
}>({
  food: 0,
  flask: 0,
  potion: 0,
  augmentation: 0,
  weapon: 0,
});

const talentsList = ref<{ name: string; value: string; isDefault?: boolean }[]>(
  []
);

const selectTalentsList = ref<string[]>([]);

// 获取当前角色的装备
const currentGear: any = computed((v) => {
  let obj: any = {};
  for (let key in gearData) {
    obj[key] = gearData[key].find((item) => item.isCurrent);
  }
  return obj;
});

// 需要消耗的积分
const needPoints = computed(() => {
  return allComboNum.value * app.commonConfig.value.points;
});

// 最大组合数
const maxCombNum = computed(() => {
  return app.commonConfig.value.maxCombNum;
});

const runDisabled = computed(() => {
  return (
    !!disabledTipContent.value ||
    allCombinations.value.length == 0 ||
    props.disabledRun
  );
});

const disabledTipContent = computed(() => {
  // if (allCombinations.value.length == 0) {
  //   return `请选择装备`;
  // }
  if (props.disabledRun && props.disabledRunContent) {
    return props.disabledRunContent;
  }
  if (allCombinations.value.length > maxCombNum.value) {
    return `最多运行${maxCombNum.value}种组合，请先删除多余组合`;
  }
  if (needPoints.value > (userInfo.value?.points || 0)) {
    return `当前积分不足`;
  }

  return "";
});

// 是否显示到底部
const showToBottom = computed(() => {
  return !hadUseGear.value && allCombinations.value.length > 0;
});

// 总的组合数量
const allComboNum = computed(() => {
  return allCombinations.value.length * selectTalentsList.value.length;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当 sticky 组件不再可见时，设置 isFirstUse 为 false
        hadUseGear.value = true;
        set(STORAGE_KEY.HAD_USE_GEAR_PAGE, true);
      }
    });
  },
  { threshold: 0 }
);

const validText = computed<{ text: string; type: string } | null>(() => {
  let contentMap: any = {
    invalidSource: {
      text: "检测到输入内容不是直接从SimC插件复制的，DPS模拟不能保证正确运行。",
      type: "warning",
    },
    mainBodyEdited: {
      text: "检测到插件输入内容已被编辑，DPS模拟不能保证正确运行。",
      type: "warning",
    },
    textAdded: {
      text: "检测到插件输入内容有变更，DPS模拟不能保证正确运行。",
      type: "warning",
    },
    invalidWowVersion: {
      text: "不支持此版本的WoW角色，仅支持当前版本。",
      type: "danger",
    },
    error: {
      text: "解析错误，请使用SimulationCraft插件复制的数据",
      type: "danger",
    },
  };

  let t = "";

  if (!validInfo.value?.validSource) {
    t = "invalidSource";
  }

  if (validInfo.value?.invalidChecksum) {
    t = validInfo.value?.invalidMainBodyChecksum
      ? "mainBodyEdited"
      : "textAdded";
  }

  if (!validInfo.value?.validVersion) {
    t = "invalidWowVersion";
  }

  if (isError.value) {
    t = "error";
  }

  return t ? contentMap[t] : null;
});

const isSourceSimcStr = computed(() => {
  return !validText.value;
});

const isDefaultStr = computed(() => {
  const { Checksum } = parseDocument(wowContent);
  return Checksum == contentChecksum.value ? 1 : 0;
});

const currentItemLevel = computed(() => {
  return getCurrentGearLevel(currentGear.value);
});

const emits = defineEmits(["run", "parse", "roleInfo"]);

watch(
  () => allCombinations.value,
  (e) => {
    nextTick(() => {
      if (combListRef.value && !hadUseGear.value) {
        observer.observe(combListRef.value);
      }
    });
  }
);

watch(
  () => buffList.value,
  (v) => {
    // 默认选中的buff
    selectBuffList.value = v.filter((v) => v.isDefault).map((v) => v.value);
  },
  {
    immediate: true,
    // deep: true,
  }
);

onMounted(() => {
  const LOCAL_SIMC_STRING = get(STORAGE_KEY.SIMC_STRING);
  if (LOCAL_SIMC_STRING) {
    onContentChange(LOCAL_SIMC_STRING);
  }

  useMitt().on(ADD_NEW_GEAR, (data: { gearData: GearData; key: string }) => {
    addNewGear(data.key, data.gearData);
  });

  if (checkLogin()) useUserStore().get();
});

onUnmounted(() => {
  observer.disconnect();
});

/**
 * 添加新的装备
 * @param key 部位
 * @param data 数据
 */
function addNewGear(key: string, data: GearData) {
  let isHad = gearData[key].find(
    (v) => v.itemId == data.itemId && v.bonus_id == data.bonus_id
  );
  if (!isHad) {
    gearData[key].push(data);
    onSelect(key, data);
  }
}
/**
 * 选择预设
 * @param item
 */
function onSelectPreset(config: any, index?: number) {
  selectPresetIndex.value = index;
  for (let key in simcConfig) {
    simcConfig[key] = config[key];
  }
  fightFormRef.value?.validate();
}

/**
 * 点击使用样例数据
 */
function onClickUseExampleData() {
  recordLog({ event: CLICK_USE_EXAMPLE_DATA });
  onContentChange(wowContent);
}

function onContentChange(value: string) {
  // textarea输入value
  content.value = value;
  onParse(value);
}

/**
 * 清空输入框
 */
function onClearContent() {
  content.value = "";
  set(STORAGE_KEY.SIMC_STRING, "");
}

/**
 * 解析数据
 * @param content
 */
async function onParse(content: string) {
  // content = content.trim();
  if (!content.trim()) {
    return;
  }

  if (parseLoading.value) {
    return;
  }
  if (content != get(STORAGE_KEY.SIMC_STRING)) recordLog({ event: PARSE_DATA });
  parseLoading.value = true;
  isError.value = false;
  parseSuccess.value = false;
  try {
    let { gear, info, talents, weekly, bag, current, inputInfo, Checksum } =
      parseDocument(content, props.sourceSlots);
    contentChecksum.value = Checksum;
    validInfo.value = inputInfo as any;

    talentsList.value = talents;
    selectTalentsList.value = [talents[0].value];
    addUpgradeSetsToGear(gear);
    roleInfo = info;

    emits("roleInfo", roleInfo);

    // 获取基础数据
    service.wowdata
      .formatGear(gear)
      .then((res: any) => {
        for (const key in res) {
          gearData[key] = res[key];
          if (res[key].find((item: any) => item.isCurrent)) {
            formValues[key] = [res[key][0]];
          }
        }

        gearData.finger1 = [...gearData.finger1, ...gearData.rings];
        gearData.finger2 = [...gearData.finger2, ...gearData.rings];
        gearData.trinket1 = [...gearData.trinket1, ...gearData.trinkets];
        gearData.trinket2 = [...gearData.trinket2, ...gearData.trinkets];
        calculateGearLevel(gearData);
        allCombinations.value = generateCombinations(formValues);
        parseSuccess.value = true;

        // 存储到localStorage
        set(STORAGE_KEY.SIMC_STRING, content);

        emits("parse", {
          gear,
          info,
          talents,
          gearData,
          weekly,
          bag,
          current,
          sourceContent: content,
          isSourceSimcStr: isSourceSimcStr.value,
        });

        nextTick(() => {
          setTimeout(() => {
            // scrollTo("playerInfoBox");
          }, 200);
        });
      })
      .finally(() => {
        parseLoading.value = false;
      });
  } catch (error) {
    console.log(error);

    isError.value = true;
    parseLoading.value = false;
  }
}

/**
 * 添加升级组合到装备
 * @param gear
 */
function addUpgradeSetsToGear(gear: Gear) {
  for (let key in gear) {
    gear[key].forEach((item) => {
      item.upgradeSets = getUpgradeInfoByBonusId(item.bonus_id);
    });
  }
  return gear;
}

// 检查是否有选中
function checkIsSelected(key: string, item: any) {
  let isHadItem = formValues[key].find(
    (v: any) => v.id == item.id && v.bonus_id == item.bonus_id
  );
  return !!isHadItem;
}

/**
 * 选择装备
 * @param key 字段名
 * @param item
 */
function onSelect(key: any, item: any) {
  let isHadItem = checkIsSelected(key, item);
  let cacheFormValues = cloneDeep(formValues);

  if (!isHadItem) {
    cacheFormValues[key].push({ ...item, isSelected: true });
  } else {
    const index = cacheFormValues[key].findIndex(
      (v) => v.id == item.id && v.gearLevel == item.gearLevel
    );
    cacheFormValues[key].splice(index, 1);
  }

  formValues[key] = cacheFormValues[key];

  allCombinations.value = generateCombinations(formValues);
}

let runTimes = 0; // 运行次数 测试用

/**
 * 开始模拟
 */
function onRun() {
  recordLog({
    event: START_SIMULATION,
    params: {
      content: content.value,
      combinationsNum: allCombinations.value.length,
      itemLevel: currentItemLevel.value,
      isDefaultStr: isDefaultStr.value,
    },
  });
  runTimes++;
  if (allCombinations.value.length > maxCombNum.value) {
    Message.warning(`最多运行${maxCombNum.value}种组合，请先删除多余组合`);
  }

  runLoading.value = true;

  // 增加天赋组合
  const combinations = addTalentsToComb(
    selectTalentsList.value,
    allCombinations.value
  );

  const runParams = {
    combinations: combinations,
    playerInfo: { ...roleInfo },
    simcConfig: {
      ...simcConfig,
      buffs: buffList.value.map((v) => ({
        key: v.value,
        value: selectBuffList.value.includes(v.value),
      })),
      consumables,
    },
    simcSourceStr: content.value,
    itemLevel: currentItemLevel.value,
    params: {
      isDefaultStr: isDefaultStr.value,
      isSourceSimcStr: isSourceSimcStr.value,
    },
  };

  emits("run", runParams);
}

function runSuccess(data?: any) {
  setTimeout(() => {
    useUserStore().subtractPoints(
      allComboNum.value * app.commonConfig.value.points
    );
    stopRun();
  }, 1000 * 3);
}

function stopRun() {
  runLoading.value = false;
}

/**
 * 生成简单的组合
 * @param formValues
 */
function generateSimpleCombinations(gearList: GearData[]) {
  const list = cloneDeep(gearList);
  const currentComb = allCombinations.value[0];
  let combinations: GearItem[] = [];

  list.forEach((item) => {
    if (item.gearKey) {
      // 如果当前组合有宝石，则添加到新组合中
      if (currentComb[item.gearKey].gem_id) {
        item.gem_id = currentComb[item.gearKey].gem_id;
      }

      // 如果当前组合有附魔，则添加到新组合中
      if (currentComb[item.gearKey].enchant_id) {
        item.enchant_id = currentComb[item.gearKey].enchant_id;
      }

      let itemComb = {
        ...currentComb,
        [item.gearKey]: item,
      };

      combinations.push(itemComb);
    }
  });

  allCombinations.value = [allCombinations.value[0], ...combinations];
}

// 生成组合的函数
function generateCombinations(formValues: {
  [property: string]: GearData[];
}): GearItem[] {
  const obj = cloneDeep(formValues);
  // 先生成手指和饰品的组合
  let fingerList = [...obj.finger1, ...obj.finger2];
  let trinketList = [...obj.trinket1, ...obj.trinket2];
  obj.finger1 = [];
  obj.finger2 = [];
  obj.trinket1 = [];
  obj.trinket2 = [];

  const keys = Object.keys(obj).filter((key) => obj[key].length > 0);
  let combinations: GearItem[] = [];

  const fingerCombs = generateKeysCombinations(fingerList, [
    "finger1",
    "finger2",
  ]);

  const trinketCombs = generateKeysCombinations(trinketList, [
    "trinket1",
    "trinket2",
  ]);

  const helper = (currentCombination: any, index: number) => {
    if (index === keys.length) {
      // 到达对象的末尾，保存当前组合
      // 如果两个饰品相同，则不保存
      // if (currentCombination.trinket1?.id === currentCombination.trinket2?.id) {
      //   return;
      // }
      combinations.push({
        ...currentCombination,
      });
      return;
    }

    const key = keys[index];
    for (const value of obj[key]) {
      currentCombination[key] = {
        ...value,
        isCurrent: !!value.isCurrent,
      }; // 设置当前属性值
      helper(currentCombination, index + 1); // 递归进入下一个属性
    }
  };

  helper({}, 0); // 初始化递归

  // 添加戒指组合
  combinations = mergeCombs(fingerCombs, combinations);

  // 添加饰品组合
  combinations = mergeCombs(trinketCombs, combinations);

  // 添加附魔
  combinations = addEnchantToOtherComb(selectedEnchants.value, combinations);

  // 添加宝石
  if (selectGemList.value.length > 0) {
    combinations = addGemToOtherComb(selectGemList.value, combinations);
  }

  // 把当前装备的组合提取出来放到第一个
  const currentIndex = combinations.findIndex((v) => {
    let keys = Object.keys(v);
    return keys.every((key) => v[key].isCurrent);
  });

  if (currentIndex > 0) {
    const currentComb = combinations.splice(currentIndex, 1)[0];
    combinations.unshift(currentComb);
  }

  allCombinations.value = combinations;
  return combinations;
}

/**
 * 合并两个组合
 * @param combs1
 * @param combs2
 */
function mergeCombs(combs1: any[], combs2: any[]) {
  let combs: GearItem[] = [];
  combs1.forEach((item) => {
    combs2.forEach((comb) => {
      comb = { ...comb, ...item };
      combs.push(comb);
    });
  });
  return combs;
}

/**
 * 生成两两组合
 * @param list
 * @param keys
 */
function generateKeysCombinations(list: any[], keys: any[]) {
  const combinations: any[] = [];
  const [key1, key2] = keys;
  // 双重循环生成所有可能的两两组合
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      combinations.push({
        [key1]: list[i],
        [key2]: list[j],
      });
    }
  }

  return combinations;
}

/**
 * 选择附魔
 * @param value
 */
function onEnchantChange(value: any) {
  selectedEnchants.value = value;
  generateCombinations(formValues);
}

/**
 * 选择宝石
 * @param value
 */
function onGemChange(value: any) {
  selectGemList.value = value;
  generateCombinations(formValues);
}

/**
 * 选择宝石
 * @param value
 */
function onTalentsChange() {
  generateCombinations(formValues);
}

/**
 * 给现有的除了当前组合的其他组合添加附魔
 */
function addEnchantToOtherComb(
  enchants: ItemEnchantSelectValue,
  combinations: GearItem[]
): GearItem[] {
  // 生成所有的附魔组合
  const allEnchantCombos = generateEnchantCombinations(enchants);

  if (allEnchantCombos.length === 0) {
    return combinations;
  }

  // 取出所有装备组合中除了当前组合的其他组合
  const otherCombinations =
    combinations.length > 1
      ? cloneDeep(combinations.filter((comb) => !isCurrentComb(comb)))
      : cloneDeep(combinations);

  // 当前组合
  const currentComb: any = combinations.find((comb) => isCurrentComb(comb));

  // 附魔后的组合
  let newCombinations: GearItem[] = [];

  // 给其他组合添加附魔
  allEnchantCombos.forEach((comb) => {
    for (let key in comb) {
      let enchant = wowdataStore.getEnchantItemByItemId(comb[key]);

      otherCombinations.forEach((item) => {
        if (key == "ring") {
          item["finger1"].enchant_id = enchant?.wowId?.toString() || "";
          item["finger1"].isSelected = true;
          item["finger1"].isCurrent = false;
          item["finger2"].enchant_id = enchant?.wowId?.toString() || "";
          item["finger2"].isSelected = true;
          item["finger2"].isCurrent = false;
        } else {
          item[key].enchant_id = enchant?.wowId?.toString() || "";
          item[key].isSelected = true;
          item[key].isCurrent = false;
        }
      });
    }
    newCombinations = [...newCombinations, ...cloneDeep(otherCombinations)];
  });

  return [currentComb, ...newCombinations];
}

/**
 * 给现有的除了当前组合的其他组合添加宝石
 */
function addGemToOtherComb(gems: number[], combinations: GearItem[]) {
  // 有插槽的组合
  let gemCombinations = cloneDeep(
    combinations.filter((item) => {
      let hasSocket = false;
      for (let key in item) {
        let a = getSocketInfo(item[key].bonus_id);
        if (a?.count) {
          hasSocket = true;
          break;
        }
      }
      return hasSocket;
    })
  );

  // 没有插槽的组合
  let noGemCombinations = combinations.filter((item) => {
    let hasSocket = false;
    for (let key in item) {
      let a = getSocketInfo(item[key].bonus_id);
      if (a?.count) {
        hasSocket = true;
        break;
      }
    }
    return !hasSocket && !isCurrentComb(item);
  });

  // 当前组合
  const currentComb: any = combinations.find((comb) => isCurrentComb(comb));

  // 附魔后的组合
  let newCombinations: GearItem[] = [];

  // 给有插槽的组合添加宝石
  gems.forEach((gemId) => {
    gemCombinations.forEach((item) => {
      Object.keys(item).forEach((key) => {
        // 判断是否有插槽 如果有插槽则添加宝石
        let a = getSocketInfo(item[key].bonus_id);
        if (a?.count) {
          item[key].gem_id = Array(a.count).fill(gemId).join("/"); // 给每个插槽添加宝石
          item[key].isSelected = true;
          item[key].isCurrent = false;
        }
      });
    });
    newCombinations = [...newCombinations, ...cloneDeep(gemCombinations)];
  });

  return [currentComb, ...noGemCombinations, ...newCombinations];
}

/**
 * 添加天赋组合
 */
function addTalentsToComb(
  list: string[],
  combinations: GearItem[]
): GearItem[] {
  const newCombs: GearItem[] = [];
  list.forEach((talents) => {
    combinations.forEach((item) => {
      newCombs.push({ ...cloneDeep(item), talents });
    });
  });
  return newCombs;
}

/**
 * 判断有几个插槽
 * @param bonusIds
 */
function getSocketInfo(
  bonus_Id: string
): { socketId: number; count: number } | null {
  let socketId = null;
  let count = 0;
  let bonusIds = (bonus_Id || "").split("/") || [];

  bonusIds.forEach((id) => {
    if (socketMap[id]) {
      socketId = id;
      count += socketMap[id];
    }
  });

  return socketId ? { socketId, count } : null;
}

/**
 * 生成附魔组合
 * @param selectValues
 */
function generateEnchantCombinations(
  selectValues: ItemEnchantSelectValue
): ItemEnchantCombo[] {
  const entries = Object.entries(selectValues).filter(
    ([_, enchants]) => enchants.length > 0
  );
  if (entries.length === 0) return [];

  const [key, ...rest] = entries;

  const combinations = key[1].map((enchantId) => ({ [key[0]]: enchantId }));

  rest.forEach(([part, enchants]) => {
    const temp: any[] = [];
    combinations.forEach((combo) => {
      enchants.forEach((enchantId) => {
        temp.push({ ...combo, [part]: enchantId });
      });
    });
    combinations.splice(0, combinations.length, ...temp);
  });

  return combinations;
}

/**
 * 移除组合
 * @param index
 */
function onRemoveComb(index: number) {
  allCombinations.value.splice(index, 1);
}

/**
 * 检查是否是当前组合
 * @param comb
 */
function isCurrentComb(comb: any) {
  return Object.keys(comb || {})
    .filter((key) => comb[key])
    .every((key) => comb[key]?.isCurrent);
}

/**
 * 移动到指定元素
 * @param id
 */
function scrollTo(id: string) {
  const target: any = document.getElementById(id);
  const rootDocument = document.getElementById("app");
  const targetPosition =
    target.getBoundingClientRect().top + rootDocument?.scrollTop - 70; // 减去60px
  document.getElementById("app")?.scrollTo({
    top: targetPosition,
    behavior: "smooth", // 平滑滚动
  });
}

/**
 * 显示组合列表引导
 */
function showCombListTour() {
  // 滚动到装备组合列表
  scrollTo("gearCombinationTableLabelId");
  showTour.value = true;
}

/**
 * 获取当前装备的装等
 */
function getCurrentGearLevel(gearComb: GearItem): Number {
  const keys = Object.keys(gearComb);
  let level = 0;
  let itemNum = 0;
  for (let key of keys) {
    let item = gearComb[key];
    if (item) {
      level += Number(item.gearLevel);
      itemNum++;
    }
  }
  return itemNum > 0 ? Number((level / itemNum).toFixed(0)) : 0;
}

defineExpose({
  runSuccess,
  stopRun,
  generateSimpleCombinations,
});
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
