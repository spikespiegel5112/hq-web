<template>
  <a-button
    class="common_importantbutton_item"
    type="primary"
    :loading="state.loading"
    @click="handleImport"
  >
    {{ props.label }}
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

const emit = defineEmits<{
  (e: "success", visible: boolean): void;
  (e: "error", visible: boolean): void;
}>();

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: "导入",
  },
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

const handleImport = () => {
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  inputEl.click();
  inputEl.addEventListener("change", (event) => {
    const loading = global.$message.loading("上传中...", 0);
    const file: any = event.target.files[0]; //
    const fileName = file.name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file", fileName);
    state.loading = true;
    loading();
    actionPromise(formData)
      .then((response: any) => {
        global.$message.success("导入成功");
        emit("success", response);
      })
      .catch((error: any) => {
        emit("error", error);
        if (error.message) {
          global.$message.error(error.message);
        } else {
          global.$message.error("上传失败");
        }
      });
  });
};

const actionPromise = (formData: any) => {
  return new Promise((resolve, reject) => {
    props
      .action(formData)
      .then((response: any) => {
        const code = response.code;
        if (code === 400) {
          reject(response);
        }
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      })
      .finally(() => {
        state.loading = false;
      });
  });
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
