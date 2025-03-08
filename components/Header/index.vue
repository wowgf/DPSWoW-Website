<template>
  <div
    class="h-16 bg-[#030812] header max-sm:px-3 max-sm:h-12 border-zinc-800 border-b"
  >
    <div
      class="container relative flex items-center justify-between h-full mx-auto"
    >
      <div class="flex items-center">
        <nuxtLink
          to="/"
          class="cursor-pointer logo max-sm:text-[20px] font-[600] flex items-baseline mr-14"
        >
          <span class="text-[#FC4F4F] text-[26px]">魔兽</span>
          <span class="text-white text-[26px]">DPS</span>
          <span class="text-[18px] font-[400]">模拟</span>
        </nuxtLink>
      </div>

      <div v-if="!isMobile" class="mr-16 nav-wrap">
        <MenuList> </MenuList>
      </div>
      <div class="flex items-center user">
        <nuxt-link
          v-if="route.path == '/'"
          to="https://github.com/simulationcraft"
          target="_blank"
          class="mr-5"
        >
          <SvgIcon name="github" class="text-[30px]"></SvgIcon>
        </nuxt-link>
        <a-button
          v-if="!isMobile && route.path != '/'"
          type="text"
          status="warning"
          class="mr-1"
          @click="onOpenFeedBack()"
        >
          <template #icon>
            <icon-thumb-up />
          </template>
          <span class="text-gray-200">意见反馈</span>
        </a-button>
        <a-button v-if="!isLogin" type="outline" @click="login.open()">
          登录 | 注册
        </a-button>
        <User
          v-else
          @feedback="() => onOpenFeedBack()"
          @donate="() => onOpenDonate()"
        ></User>
      </div>
    </div>
  </div>
  <a-modal
    v-model:visible="showFeedback"
    :width="isMobile ? '90%' : '560px'"
    :align-center="false"
    top="100px"
    unmountOnClose
    :on-before-ok="onSubmitFeedback"
  >
    <template #title> 反馈与建议 </template>
    <div>
      <a-form
        ref="feedbackFormRef"
        :model="feedbackFormData"
        :rules="feedbackFormRules"
      >
        <a-form-item label="反馈内容" field="content">
          <a-textarea
            v-model="feedbackFormData.content"
            placeholder="提上你宝贵的建议吧~"
            allow-clear
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :max-length="300"
            show-word-limit
          ></a-textarea>
        </a-form-item>
        <a-form-item label="联系方式" field="contact">
          <a-input
            v-model="feedbackFormData.contact"
            placeholder="请输入联系方式 微信号、QQ号、手机号、邮箱等"
            allow-clear
          ></a-input>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import User from "./User.vue";
import { useLoginStore } from "~/store/login";
import { useUserStore } from "~/store/user";
import MenuList from "./MenuList.vue";
import { Message, Modal, type Form } from "@arco-design/web-vue";
import { MITT } from "~/enums/consts";
const props = defineProps<{
  showRegister: boolean;
  showAbilityBtn: boolean;
}>();

// const chatRef = ref();
const { router } = useCool();
const route = useRoute();
const { isLogin, info, isArtisan } = storeToRefs(useUserStore());
const login = useLoginStore();
const { isMobile, deviceWidth } = storeToRefs(useAppStore());
const showMenuDrawer = ref(false);
// const { state, getAllUnreadCount } = useChat();
const { mitt } = useCool();

const feedbackFormRef = ref<InstanceType<typeof Form>>();

const feedbackFormData = reactive({
  content: "",
  contact: "",
});

const showInviteBtn = computed(() => {
  return route.path !== "/";
});

const feedbackFormRules = {
  content: [{ required: true, message: "请输入反馈内容", trigger: "blur" }],
};

const showFeedback = ref(false);
const showDonate = ref(false);
const donations = ref<any[]>([]);
const selectedDonation = ref(null);

mitt.on(MITT.SHOW_FEEDBACK, () => {
  onOpenFeedBack();
});

function selectDonation(donation: any) {
  selectedDonation.value = donation;
}

/**
 * 获取捐赠参数
 */
function getDonationsParams() {
  service.comm.getParam("donateParams").then((res: any) => {
    donations.value = res;
    selectedDonation.value = res[2];
  });
}

// getAllUnreadCount();
getDonationsParams();

function toRegisterArt() {
  router.push("/artisanInfo/register");
}

function toAbility() {
  router.push("/artisanAbility");
}

function onOpenMenu() {
  showMenuDrawer.value = true;
}

function onOpenFeedBack() {
  if (!isLogin.value) {
    login.open();
    return;
  }
  // tucao();
  // router.push();
  showFeedback.value = true;
  // window.open("/feedback", "_blank");
}

/**
 * 打开捐赠弹窗
 */
function onOpenDonate() {
  showDonate.value = true;
}

/**
 * 提交捐赠
 */
function onSubmitDonate() {
  Message.success("非常感谢你的支持！");
  return true;
}

async function onSubmitFeedback() {
  let errors = await new Promise((resolve) => {
    feedbackFormRef.value?.validate((errors) => {
      resolve(errors);
    });
  });
  if (errors) return false;
  service.feedback
    .add(feedbackFormData)
    .then((res) => {
      showFeedback.value = false;
      Message.success("提交成功");
      return true;
    })
    .catch((e) => {
      return false;
    });
}

/**
 * 跳转至工作台
 */
function toDashboard() {
  let page = "";
  if (route.path === "/") {
    page = "artisanAbility";
  }
  if (route.path === "/requirement") {
    page = "requirement";
  }
  if (route.path === "/service") {
    page = "service";
  }
  router.push("/dashboard/" + page);
}
</script>

<style lang="scss" scoped>
.header-invite-btn {
  // background-color: #FF7A1C;
  // FE415B
  // background-image: linear-gradient(90deg, #FF7A1C 0%, #FE415B 100%);
  // color: #fff;
  // background-color: #F2F3F5;
  font-weight: 600;
  .header-invite-btn-icon {
    height: 18px;
    width: 18px;
    margin-right: 5px;
    // animation: shake 1.5s ease infinite;
  }
}
.header {
  // font-size: 24px;
  // font-weight: 600;
  // color: var(--el-color-primary);
  // color: #ffd900;
}
.donation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  .donation-item {
    width: 90px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: border-color 0.3s;

    &.selected {
      border-color: #007bff;
    }

    &:hover {
      border-color: #007bff;
    }
  }

  .donation-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 3px;
  }

  .donation-name {
    font-size: 16px;
    margin-bottom: 0px;
  }

  .donation-amount {
    font-size: 14px;
    color: grey;
    // font-weight: bold;
  }
}
.qr-code {
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  img {
    width: 250px;
    height: 250px;
    margin-top: 10px;
  }

  @media (max-width: 640px) {
    img {
      width: 150px;
      height: 150px;
      margin-top: 5px;
    }
  }
}
</style>
