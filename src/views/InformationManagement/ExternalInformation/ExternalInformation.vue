<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
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
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
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

import { infoManagementExternalInfoGetPageRequest } from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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
    label: "信息上报单位",
    name: "infoReportUnit",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },

  {
    label: "信息上报开始时间",
    name: "infoReportTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "信息上报结束时间",
    name: "infoReportTimeEnd",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "信息等级",
    name: "infoLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "信息类型",
    name: "infoType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "信息状态",
    name: "infoStatus",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "附件",
    name: "attachment",
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
    actions: ["edit", "review", "delete"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogMode: "",
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  pagination.total = undefined;
  infoManagementExternalInfoGetPageRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleEdit = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
};

const handleAdd = () => {
  state.dialogVisible = true;
  state.dialogMode = "add";
};

const handleSearch = (formData: object) => {
  queryFormData = formData;
  getData();
};

const handleReset = (formData: object) => {
  queryFormData = formData;
  getData();
};

const handleClose = () => {
  state.dialogVisible = false;
};

const handleSubmit = () => {};
onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
