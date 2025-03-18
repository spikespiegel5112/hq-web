<template>
  <div class="common_table_wrapper">
    <Statistic :statisticData="state.statisticData" />
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      :disabled="!global.$checkAuth(global, 'passengerFlow:eHailingParking:getPage')"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ExportButton
          :action="passengerFloweEHailingParkingExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: null,
          }"
          :disabled="
            !global.$checkAuth(global, 'passengerFlow:eHailingParking:export')
          "
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :tablePermissionCodeListWithAction="tablePermissionCodeListWithAction"
      :dataModel="pageModel"
      tabTable
      statisticTable3
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

import {
  passengerFloweEHailingParkingExportRequest,
  passengerFloweEHailingParkingGetPageRequest,
} from "@/api/management";

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import Statistic from "./Statistic.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

import { passengerFloweEHailingParkingGetStatisticsRequest } from "@/api/management";

const props = defineProps({
  capPlace: { type: Number, required: true, default: null },
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
    imagePreview: true,
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
  statisticData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});
const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
});
const tablePermissionCodeListWithAction = computed(() => {
  return [
    {
      code: "passengerFlow:eHailingParking:save",
      action: "edit",
    },
    {
      code: "passengerFlow:eHailingParking:delete",
      action: "delete",
    },
    {
      code: "passengerFlow:eHailingParking:getOneById",
      action: "review",
    },
    {
      code: "passengerFlow:eHailingParking:importExcel",
      action: "importExcel",
    },
    {
      code: "passengerFlow:eHailingParking:exportExcel",
      action: "exportExcel",
    },
    {
      code: "passengerFlow:eHailingParking:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "passengerFlow:eHailingParking:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  if (!global.$checkAuth(global, "passengerFlow:eHailingParking:getPage")) return;
  queryFormData.capPlace = props.capPlace;
  global.$store.commit("app/updateTableLoading", true);
  passengerFloweEHailingParkingGetPageRequest({
    ...queryFormData,
    ...pagination,
    capPlace: props.capPlace,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      state.processedTableData = response.list.map((item: any) => {
        return {
          ...item,
          capFlag: global
            .$getDictionary("entranceAndExitType")
            .find((item2: any) => item2.value === item.capFlag)?.label,
          capPlace: global
            .$getDictionary("e_hailling_cap_place")
            .find((item2: any) => item2.value === item.capPlace)?.label,
        };
      });
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getStatisticData = () => {
  passengerFloweEHailingParkingGetStatisticsRequest({
    capPlace: props.capPlace,
  })
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
  getData();
  getStatisticData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
