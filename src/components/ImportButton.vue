<template>
  <a-button class="common_importantbutton_item" @click="handleImport">
    导入
  </a-button>
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
  action: {
    type: Function,
    required: true,
    default: () => {},
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const fileList = ref([]);
const headers = ref({});

const state = reactive({
  loading: false,
});

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {}
);

const init = () => {};

const handleImport = (value: any) => {
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  inputEl.click();
  inputEl.addEventListener("change", (event) => {
    const file: any = event.target.files[0]; //
    const formData = new FormData();
    formData.append("multipartFile", file);

    props
      .action(formData)
      .then((response: any) => {
        // global.$exportTable(response, global.$route);
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
};

const handleChange = (info: UploadChangeParam) => {
  console.log(info);
  const file = info.file;
  if (file.status === "uploading") {
    state.loading = true;
    emit("onSuccess", true);
  }
  if (file.status === "done") {
    if (file.response.code === 0) {
      global.$message.success(`上传成功`);
      emit("onSuccess", file.response);
    } else if (file.response.code === 501) {
      global.$message.error("上传失败");
      emit("onError", file.response);
    }
    emit("onSuccess", false);
    state.loading = false;
  } else if (file.status === "error") {
    global.$message.error("上传失败");
    emit("onError", file.response);
    emit("onSuccess", false);
    state.loading = false;
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
