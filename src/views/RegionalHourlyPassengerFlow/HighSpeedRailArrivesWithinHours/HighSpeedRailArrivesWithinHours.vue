<template>
  <div class="common_table_wrapper">
    <FilterTool></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          :action="`/api/manage/backend/railwayArrive/importPic`"
        />
        <a-button class="export">导出</a-button>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      :pagination="pagination"
      tabTable
      @onEdit="handleEdit"
      @onChangePage="handleChangePage"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
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

import { backendRailwayArriveGetRailwayArrivePagingRequest } from "@/api/management";
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
    label: "日期",
    name: "statisticalDate",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "小时疏散数",
    name: "dispersedHourlyPassengerCount",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "预测小时到达数",
    name: "estimatedHourlyArrivePassengerCount",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "更新时间",
    name: "updateTime",
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

const pagination = reactive({
  page: 1,
  pageSize: 30,
  total: 0,
});

const env = computed(() => {
  return import.meta.env;
});

const getData = () => {
  backendRailwayArriveGetRailwayArrivePagingRequest({
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

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
