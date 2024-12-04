<template>
  <div class="common_table_wrapper">
    <FilterTool></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="import">导入</a-button>
        <a-button class="export">导出</a-button>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      @onEdit="handleEdit"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      @onClose="handleClose"
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

import { screenBannerInfoRequest } from "@/api/management";
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
    label: "操作",
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
  const result = [] as any[];
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

const handleEdit = () => {
  state.dialogVisible = true;
  state.dialogMode = "edit";
};

const handleAdd = () => {
  state.dialogVisible = true;
  state.dialogMode = "add";
};

const handleClose = (event: any) => {
  state.dialogVisible = false;
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
