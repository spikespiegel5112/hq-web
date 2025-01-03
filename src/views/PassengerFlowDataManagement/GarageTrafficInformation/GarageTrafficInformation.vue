<template>
  <div class="common_table_wrapper">
    <FilterTool       @onSearch="handleSearch"       @onReset="handleReset"       v-model="queryFormData"     ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          :action="importParkingVehicleMonitorImportExcelRequest"
          @success="() => getData()"
        />
        <ExportButton
          :action="passengerFlowParkingPassengerFlowExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: 1000,
          }"
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      :pagination="pagination"
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

import {
  passengerFlowParkingPassengerFlowGetPageRequest,
  passengerFlowParkingPassengerFlowExportRequest,
  importParkingVehicleMonitorImportExcelRequest,
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

const handleEdit = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
};

const handleReview = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "review";
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

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {};
onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
