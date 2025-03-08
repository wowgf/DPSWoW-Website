<template>
  <div class="flex flex-wrap">
    <a-image-preview-group infinite>
      <div
        v-for="(item, index) in images"
        :key="index"
        class="relative mb-3 mr-3 cursor-pointer img-box"
      >
        <a-image
          :src="item"
          :width="width + 'px'"
          :height="height + 'px'"
          fit="cover"
        >
        </a-image>
        <icon-close-circle
          class="absolute top-1 right-1 cursor-pointer text-[18px]"
          @click="onDeleteImg(index)"
        />
      </div>
    </a-image-preview-group>
    <Upload
      v-if="images.length < limit"
      :token="token"
      :limitSize="size"
      @success="onUploadSuccess"
      class="img-btn"
    >
      <div
        :style="{ width: width + 'px', height: height + 'px' }"
        class="upload-box h-[130px] w-[130px] flex justify-center items-center bg-gray-700"
      >
        <icon-plus :size="30" />
      </div>
    </Upload>
  </div>
</template>

<script setup lang="ts">
import Upload from "~/components/Upload/index.vue";
import { useUserStore } from "~/store/user";

const props = withDefaults(
  defineProps<{
    modelValue: string[] | string;
    limit?: number;
    size?: number;
    width?: number;
    height?: number;
  }>(),
  {
    limit: 9,
    size: 3,
    width: 130,
    height: 130,
  }
);

const { token } = storeToRefs(useUserStore());
const images = ref<string[]>([]);
const emits = defineEmits(["update:modelValue"]);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue && typeof props.modelValue === "string") {
      images.value = [props.modelValue];
    } else {
      images.value = props.modelValue;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => images.value,
  () => {
    emits("update:modelValue", images.value);
  },
  {
    deep: true,
  }
);

function onUploadSuccess(e: { url: string }) {
  images.value.push(e.url);
}

// 删除图片
function onDeleteImg(index: number) {
  images.value.splice(index, 1);
}
</script>

<style></style>
