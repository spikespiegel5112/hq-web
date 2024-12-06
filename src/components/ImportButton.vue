<template>
  <a-upload
    class="common_importantbutton_item"
    v-model:file-list="fileList"
    name="file"
    :maxCount="1"
    :action="props.action"
    :headers="headers"
    @change="handleChange"
  >
    <a-button class="import">导入</a-button>
  </a-upload>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  emit,
  nextTick,
} from "vue";
import type { UploadChangeParam } from "ant-design-vue";

const emit = defineEmits<{
  (e: "onSuccess", visible: boolean): void;
  (e: "onError", visible: boolean): void;
}>();

const props = defineProps({
  action: { type: String, required: true, default: "" },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const fileList = ref([]);
const headers = ref({});

const state = reactive({});

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {}
);

const init = () => {};
const handleChange = (info: UploadChangeParam) => {
  console.log(info);
  const file = info.file;
  if (file.status !== "uploading") {
  }
  if (file.status === "done") {
    if (file.response.code === 0) {
      global.$message.success(`上传成功`);
      emit("onSuccess", file.response);
    } else if (file.response.code === 501) {
      global.$message.error("上传失败");
      emit("onError", file.response);
    }
  } else if (file.status === "error") {
    global.$message.error("上传失败");
    emit("onError", file.response);
  }
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_importantbutton_item {
  &.ant-upload-wrapper {
    :deep(.ant-upload-list) {
      display: none;
    }
  }
}
</style>
