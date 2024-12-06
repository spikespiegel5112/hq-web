<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
  nextTick,
} from "vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const fileList = ref([]);
const headers = ref({});

const tableHeight = computed(() => {});

const state = reactive({
  accessLogList: [] as any[],
});

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {}
);

const init = () => {};
const handleChange = () => {};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.import {
  background-color: #0096ff;
}
</style>
