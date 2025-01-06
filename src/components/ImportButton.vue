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
    default: "上传",
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
    const formData = new FormData();
    formData.append("file", file);
    state.loading = true;
    props
      .action(formData)
      .then((response: any) => {
        emit("success", response);
        loading();
      })
      .catch((error: any) => {
        console.log(error);
        emit("error", error);
        global.$message.error("上传失败");
        loading();
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
