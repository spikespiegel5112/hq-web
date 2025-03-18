<template>
  <div class="common_table_wrapper">
    <Statistic :statisticData="props.statisticData" />
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
  passengerFlowStorageGetPageRequest,
} from "@/api/management";

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import Statistic from "./Statistic.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  parkCode: { type: String, required: true, default: "" },
  statisticData: { type: Object, required: true, default: {} },
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
    label: "进场数量",
    name: "arriveNum",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "离场数量",
    name: "leaveNum",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "车场编码",
    name: "parkCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "统计时间",
    name: "time",
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
const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
});
const tablePermissionCodeListWithAction = computed(() => {
  return [
    {
      code: "planManagement:emergencyPlan:save",
      action: "edit",
    },
    {
      code: "planManagement:emergencyPlan:delete",
      action: "delete",
    },
    {
      code: "planManagement:emergencyPlan:getOneById",
      action: "review",
    },
    {
      code: "planManagement:emergencyPlan:importExcel",
      action: "importExcel",
    },
    {
      code: "planManagement:emergencyPlan:exportExcel",
      action: "exportExcel",
    },
    {
      code: "planManagement:emergencyPlan:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "planManagement:emergencyPlan:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  queryFormData.parkCode = props.parkCode;
  global.$store.commit("app/updateTableLoading", true);
  passengerFlowStorageGetPageRequest({
    ...queryFormData,
    ...pagination,
    parkCode: props.parkCode,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      state.processedTableData = response.list.map((item: any) => {
        return {
          ...item,
          parkCode: global
            .$getDictionary("storage_park_code")
            .find((item2: any) => {
              return item2.value === item.parkCode;
            })?.label,
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

const handleSearch = (formData: object) => {
  queryFormData = formData;
  getData();
};

const handleReset = (formData: object) => {
  queryFormData = formData;
  getData();
};

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
