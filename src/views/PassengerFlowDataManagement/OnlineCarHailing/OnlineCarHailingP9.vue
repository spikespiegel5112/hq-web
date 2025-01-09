<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>

    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ExportButton
          :action="passengerFlowStorageExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: null,
          }"
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      tabTable
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

import {
  passengerFlowStorageExportRequest,
  passengerFloweEHailingParkingGetPageRequest,
} from "@/api/management";

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  capPlace: { type: String, required: true, default: "" },
});

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
    label: "类型",
    name: "capFlag",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "出入口名称",
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
    label: "图片链接",
    name: "imgInfo",
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
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  queryFormData.capPlace = props.capPlace;
  global.$store.commit("app/updateTableLoading", true);
  passengerFloweEHailingParkingGetPageRequest({
    ...queryFormData,
    ...pagination,
    capPlace: props.capPlace,
  })
    .then((response: any) => {
      state.tableData = response.data.list;
      state.processedTableData = response.data.list.map((item: any) => {
        return {
          ...item,
          capFlag: global
            .$getDictionary("entranceAndExitType")
            .find((item2: any) => item2.value === item.capFlag)?.label,
          capPlace: global
            .$getDictionary("e_hailling_cap_place", "string")
            .find((item2: any) => item2.value === item.capPlace)?.label,
        };
      });
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
onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
