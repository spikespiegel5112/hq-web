<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          :action="`/api/manage/backend/railwayArrive/importPic`"
          @onSuccess="handleUploaded"
        />
        <ExportButton
          :action="passengerFlowMetroPassengerFlowExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: 1000,
          }"
        />
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
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
  passengerFlowMetroPassengerFlowGetPageRequest,
  backendRailwayArriveRailwayArriveExportRequest,
  backendRailwayArriveSaveRailwayArriveRequest,
  passengerFlowMetroPassengerFlowExportRequest,
  eventManageSuddenEventExportRequest,
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
    label: "小时进站数",
    name: "metroHourInTotal",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "小时出站数",
    name: "metroHourOutTotal",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "地铁站",
    name: "metroStationCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "统计时间",
    name: "metroStationCode",
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
    fixed: "right",
    actions: ["edit", "review", "delete"],
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
const env = computed(() => {
  return import.meta.env;
});

const getData = () => {
  passengerFlowMetroPassengerFlowGetPageRequest({
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

const handleSubmit = (formData: any) => {
  backendRailwayArriveSaveRailwayArriveRequest(formData)
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};
const handleDelete = (id: number) => {
  infoManagementExternalInfoDeleteRequest({ id })
    .then((response: any) => {
      global.$message.success("删除成功");
      getData();
    })
    .catch((error: any) => {
      global.$message.error("删除失败");
      console.log(error);
    });
};

const handleUploaded = (response: any) => {
  getData();
};

const handleExport = () => {
  backendRailwayArriveRailwayArriveExportRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      global.$exportTable(response, global.$route);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
