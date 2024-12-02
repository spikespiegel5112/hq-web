<template>
  <div class="common_main_container">
    <FilterTool></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="import">导入</a-button>
        <a-button class="export">导出</a-button>
        <a-button class="add">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      height="calc(100vh - 3.5rem)"
      @onEdit="handleEdit"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogVisible"
    ></EditDialog>
  
  </div>
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

import { screenBannerInfoRequest } from "@/api/screen";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const pageModel = ref([
  {
    label: "序号",
    name: "index",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: false,
  },
  {
    label: "id",
    name: "id",
    required: false,
    tableVisible: false,
    formVisible: true,
    exportVisible: false,
  },
  {
    label: "报警类型",
    name: "higywayCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警内容",
    name: "highwayName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警时间",
    name: "bridgeCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警地点",
    name: "bridgeName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "查看",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    actions: ["edit"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dataModel: [] as any[],
  dialogVisible: false,
  dialogMode: "",
});

const getData = () => {
  const result = [
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
  ] as any[];
  for (let index = 0; index < 30; index++) {
    result.push({
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    });
  }
  state.tableData = result;
};

const handleEdit = (type: string, tableData: any) => {
  state.dialogVisible = true;
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
