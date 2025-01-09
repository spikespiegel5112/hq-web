<template>
  <a-button class="export" @click="handleExport" :loading="state.loading">
    导出
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
  (e: "onSuccess", visible: boolean): void;
  (e: "onError", visible: boolean): void;
}>();

const props = defineProps({
  action: {
    type: Function,
    required: true,
    default: () => {},
  },
  queryFormData: {
    type: Object,
    required: false,
    default: {},
  },
  pagination: {
    type: Object,
    required: false,
    default: {
      pageSize: 9999,
    },
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

const handleExport = () => {
  state.loading = true;
  const loading = global.$message.loading("处理中...", 0);
  props
    .action({
      ...props.queryFormData,
      // ...props.pagination,
    })
    .then((response: any) => {
      loading();
      state.loading = false;
      global.$exportTable(response, global.$route);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {});

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
