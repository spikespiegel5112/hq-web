<template>
  <div class="common_table_wrapper">
    <Statistic :statisticData="state.statisticData" />
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ExportButton
          :action="passengerFlowParkingPassengerFlowExportRequest"
          :queryFormData="queryFormData"
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      :pagination="pagination"
      statisticTable
      @onEdit="handleEdit"
      @onChangePage="handleChangePage"
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

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import Statistic from "./Statistic.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

import {
  passengerFlowParkingPassengerFlowGetPageRequest,
  passengerFlowParkingPassengerFlowExportRequest,
  passengerFlowParkingPassengerFlowGetStatisticsRequest,
} from "@/api/management";

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
    label: "出入口",
    name: "capPlace",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "抓拍时间",
    name: "capTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "车牌号",
    name: "plateNo",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "图片",
    name: "imgInfo",
    imagePreview: true,
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
  statisticData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  passengerFlowParkingPassengerFlowGetPageRequest({
    ...queryFormData,
    ...pagination,
  }).then((response: any) => {
    response = response.data;
    response.list = response.list.map((item: any) => {
      return {
        ...item,
        attachmentList: [
          {
            attachmentName: item.imgInfo,
            directLocation: true,
          },
        ],
      };
    });
    state.tableData = response.list;
    pagination.total = response.total;
  });
};

const getStatisticData = () => {
  passengerFlowParkingPassengerFlowGetStatisticsRequest({})
    .then((response: any) => {
      state.statisticData = response.data;
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

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

onMounted(async () => {
  getStatisticData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
