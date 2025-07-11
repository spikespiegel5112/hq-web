<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      :disabled="!global.$checkAuth(global, 'passengerFlow:eHailingParking:getPage')"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ExportButton
          :action="passengerFlowStorageExportRequest"
          :queryFormData="queryFormData"
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
  passengerFlowStorageExportRequest,
  passengerFlowStorageGetPageRequest,
} from "@/api/management";

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  parkCode: { type: String, required: true, default: "" },
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
  queryFormData.parkCode = props.parkCode;
  global.$store.commit("app/updateTableLoading", true);
  passengerFlowStorageGetPageRequest({
    ...queryFormData,
    ...pagination,
    parkCode: props.parkCode,
  })
    .then((response: any) => {
      state.tableData = response.data.list;

      state.processedTableData = response.data.list.map((item: any) => {
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

const handleClose = () => {
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
