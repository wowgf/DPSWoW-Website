<template>
  <a-modal
    :visible="showModal"
    draggable
    unmount-on-close
    :width="isMobile ? '100%' : ''"
    :title="title"
    :ok-loading="loading"
    @ok="onOk"
  >
    <Form ref="formRef"></Form>
    <div>
      <span class="mr-1 text-red-600">*</span>
      <span class="text-gray-400"
        >根据国家网信办相关规定，发布互联网信息需绑定手机号</span
      >
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import Form from "./index.vue";
import { useUserStore } from "~/store/user";
import { useAppStore } from "~/store/app";
const showModal = ref(true);
const title = ref("手机号绑定");
const formRef = ref<InstanceType<typeof Form>>();
const loading = ref(false);
const { get } = useUserStore();
const { isMobile } = storeToRefs(useAppStore());
function onOk() {
  formRef.value?.submit().then((formData) => {
    loading.value = true;
    service.user
      .bindPhone(formData)
      .then(() => {
        get();
        Message.success("绑定成功");
        showModal.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  });
}
</script>

<style></style>
