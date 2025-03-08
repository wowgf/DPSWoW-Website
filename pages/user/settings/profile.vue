<template>
  <PageItemCard hide-border>
    <Layout label="基础信息">
      <div class="page--setting-profile">
        <a-form
          ref="profileRef"
          :model="userInfo"
          :rules="rules1"
          auto-label-width
        >
          <a-form-item label="头像">
            <Upload
              :token="token"
              @success="onUploadSuccess"
              class="img-btn"
              accept="image/png,image/jpeg,image/jpg"
            >
              <a-avatar
                :imageUrl="userInfo.avatarUrl"
                style="height: 100px; width: 100px"
                object-fit="cover"
              ></a-avatar>
            </Upload>
          </a-form-item>
          <a-form-item label="昵称" field="nickName">
            <a-input
              v-model="userInfo.nickName"
              :max-length="20"
              :style="{ width: '400px' }"
            ></a-input>
          </a-form-item>
          <!-- <a-form-item label="游戏角色名" field="gameInfo.gameCharacterName">
        <a-input
          v-model="userInfo.gameInfo.gameCharacterName"
          :max-length="20"
          :style="{ width: '400px' }"
          placeholder="请输入游戏角色名"
        ></a-input>
      </a-form-item> -->
          <!-- <a-form-item label="服务器" field="gameInfo.serverName">
        <ServerNameSelect
          v-model="userInfo.gameInfo.serverName"
          allText="清除"
          placeholder="请选择服务器"
        ></ServerNameSelect>
      </a-form-item> -->
          <a-form-item label="个人介绍" field="introduction">
            <a-textarea
              v-model="userInfo.introduction"
              :max-length="120"
              show-word-limit
              :style="{ width: '400px' }"
            ></a-textarea>
          </a-form-item>
          <a-form-item label="手机号">
            <span v-if="info?.phone" class="mr-3">{{ info?.phone }}</span>
            <a-button
              v-if="!info?.phone"
              type="primary"
              size="mini"
              @click="onOpenBind"
              >{{ info?.phone ? "更换手机号" : "绑定手机号" }}</a-button
            >
          </a-form-item>

          <a-form-item label="微信">
            <span v-if="info?.unionid" class="mr-3">已绑定</span>
            <a-button
              v-else
              type="primary"
              size="mini"
              @click="onOpenBindWechat"
            >
              绑定
            </a-button>
          </a-form-item>

          <!-- <a-form-item label="聊天功能">
        <a-radio-group v-model="userInfo.isOpenChat" @change="updateUserInfo">
          <a-radio :value="1">开启</a-radio>
          <a-radio :value="0">关闭</a-radio>
        </a-radio-group>
        <template #extra>
          <p class="text-yellow-500">关闭后，将不再接受用户聊天咨询</p>
        </template>
      </a-form-item> -->
        </a-form>
        <!-- <div v-if="isArtisan" class="mb-4 text-xl font-bold">工匠信息</div>
    <ArtisanInfoForm
      v-if="isArtisan"
      ref="artisanInfoFormRef"
      :info="artisanInfo"
    ></ArtisanInfoForm> -->

        <div class="flex justify-start w-full">
          <a-button
            :loading="saveLoading"
            :long="isMobile"
            type="primary"
            class="w-[200px]"
            @click="onSubmit()"
          >
            保存
          </a-button>
        </div>
        <!-- <div class="text-gray-300 text-[12px] mt-10">
      <span class="text-[13px]">若要停用此账号，可点击</span>
      <span class="text-[12px] cursor-pointer italic" @click="onLogoff()">
        注销账号
      </span>
    </div> -->
      </div>
    </Layout>
  </PageItemCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/user/Layout.vue";
import Upload from "~/components/Upload/index.vue";
import { useUserStore } from "~/store/user";
import { Message, Modal } from "@arco-design/web-vue";
import type { ArtisanInfoDTO } from "~/types/ArtisanInfo";
import { useDict } from "~/cool";
import { useAppStore } from "~/store/app";
import openBindPhone from "~/components/BindPhone/install";
import openBindWechat from "~/components/BindWechat/install";
import type { GameInfo } from "~/types/user";
// import ArtisanInfoForm from "~/components/ArtisanInfo/Form.vue";
const { dict } = useDict([
  "artisanSkills",
  "gameServerName",
  "onlineTime",
  "deliverySpeed",
]);
const userStore = useUserStore();
const { isMobile } = useAppStore();
const { info, token, isArtisan } = storeToRefs(userStore);
const profileRef = ref();
const artisanInfoRef = ref();
const artisanInfoFormRef = ref();
const saveLoading = ref(false);
const rules1 = {
  nickName: [{ required: true, message: "请输入游戏角色名", trigger: "blur" }],
  avatarUrl: [{ required: true, message: "请输入服务器", trigger: "blur" }],
};

const rules2 = {
  gameCharacterName: [
    { required: true, message: "请输入游戏角色名", trigger: "blur" },
  ],
  serverName: [{ required: true, message: "请输入服务器", trigger: "blur" }],
  skills: [{ required: true, message: "请选择工匠技能", trigger: "blur" }],
  onlineTime: [{ required: true, message: "请选择在线时间", trigger: "blur" }],
  deliverySpeed: [
    { required: true, message: "请选择发货速度", trigger: "blur" },
  ],
  // ngaGyUrl为选填，类型为url地址
  ngaGyUrl: [{ type: "url", message: "请输入正确的链接地址", trigger: "blur" }],
  // allowSyncData: [
  //   { required: true, message: "请选择是否同意数据同步", trigger: "blur" },
  // ],
};

const userInfo = reactive<{
  nickName: string;
  avatarUrl: string;
  introduction: string;
  isOpenChat: number;
  gameInfo: GameInfo;
}>({
  nickName: info.value?.nickName || "",
  avatarUrl: info.value?.avatarUrl || "",
  introduction: info.value?.introduction || "",
  isOpenChat: info.value?.isOpenChat,
  gameInfo: {
    gameCharacterName: info.value?.gameInfo?.gameCharacterName || "",
    serverName: info.value?.gameInfo?.serverName || "",
  },
});

const artisanInfo = reactive<ArtisanInfoDTO>({
  gameCharacterName: info.value?.artisanInfo?.gameCharacterName || "",
  images: info.value?.artisanInfo?.images || [],
  introduction: info.value?.artisanInfo?.introduction || "",
  serverName: info.value?.artisanInfo?.serverName || "",
  skills: info.value?.artisanInfo?.skills || [],
  onlineTime: info.value?.artisanInfo?.onlineTime || "",
  deliverySpeed: info.value?.artisanInfo?.deliverySpeed || "",
  allowSyncData: info.value?.artisanInfo?.allowSyncData,
  ngaGyUrl: info.value?.artisanInfo?.ngaGyUrl || "",
  deliveryTimes: info.value?.artisanInfo?.deliveryTimes || [],
});

/**
 *
 * @param e
 */
function onUploadSuccess(e: { url: string }) {
  userInfo.avatarUrl = e.url;
  service.user.updateAvatar(e.url).then(() => {
    Message.success("头像修改成功");
    // userStore.get();
    if (info.value) info.value.avatarUrl = e.url;
  });
}

function onUploadArtSuccess(e: { url: string }) {
  artisanInfo.images.push(e.url);
}

// 删除图片
function onDeleteArtImg(index: number) {
  artisanInfo.images.splice(index, 1);
}

function onOpenBind() {
  openBindPhone({ title: info.value?.phone ? "更换手机号" : "绑定手机号" });
}

function onOpenBindWechat() {
  openBindWechat();
}

async function updateUserInfo() {
  await userStore
    .update(userInfo)
    .then(() => {
      Message.success("修改成功");
    })
    .finally(() => {
      saveLoading.value = false;
    });
}

/**
 * 验证基本信息表单
 */
function validateProfile() {
  return new Promise((resolve, reject) => {
    profileRef.value.validate((errors: any) => {
      if (errors) {
        reject();
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * 验证基本信息表单
 */
function validateArtisanInfo() {
  return new Promise((resolve, reject) => {
    // resolve(true);
    if (!artisanInfoRef.value) resolve(true);
    artisanInfoRef.value.validate((errors: any) => {
      if (errors) {
        reject();
      } else {
        resolve(true);
      }
    });
  });
}

async function onSubmit() {
  let check1 = await validateProfile();
  let check2 = isArtisan.value
    ? await artisanInfoFormRef.value.validateArtisanInfo()
    : true;
  if (check1 || check2) {
    saveLoading.value = true;
    if (isArtisan.value)
      await service.artisanInfo.updateInfo(artisanInfoFormRef.value.getData());
    updateUserInfo();
  }
}

function onLogoff() {
  Modal.confirm({
    title: "确定注销该帐号吗？",
    content: "注销后，该账号下的数据将被删除，且无法恢复！",
    okText: "确认",
    onOk: async () => {
      Modal.confirm({
        title: "请再次确认",
        content: "点击确认后将彻底注销该帐号及该帐号下的所有数据",
        okText: "确认",
        onOk: async () => {
          await userStore.logoff();
        },
      });
    },
  });
}
</script>

<style lang="scss" scoped>
.page--setting-profile {
}
</style>
