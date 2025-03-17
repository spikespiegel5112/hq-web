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
          :action="passengerFlowAreaFlowExportRequest"
          :queryFormData="queryFormData"
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :permissionCodeListWithAction="permissionCodeListWithAction"
      :dataModel="pageModel"
      :pagination="pagination"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
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
  passengerFlowAreaAreaInOutFlowGetPageRequest,
  passengerFlowAreaFlowExportRequest,
} from "@/api/management";
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
    label: "计算时间",
    name: "analyzeTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "相机编码",
    name: "cameraId",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "相机名称",
    name: "cameraName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "进入人员数量",
    name: "personIn",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "离开人员数量",
    name: "personOut",
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
const env = computed(() => {
  return import.meta.env;
});
const permissionCodeListWithAction = computed(() => {
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
  global.$store.commit("app/updateTableLoading", true);
  passengerFlowAreaAreaInOutFlowGetPageRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      state.processedTableData = response.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            analyzeTime: global
              .$dayjs(item.analyzeTime)
              .format("YYYY-MM-DD HH:mm:ss"),
          };
        }
      );
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleEdit = (currentRowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = currentRowData;
};

const handleReview = (currentRowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "review";
  state.currentRowData = currentRowData;
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

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleUploaded = (response: any) => {
  getData();
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
