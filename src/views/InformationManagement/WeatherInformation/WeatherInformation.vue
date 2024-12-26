<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
                 <!-- <ExportButton
          :action="eventManageSuddenEventExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: 9999999,
          }"
        /> -->
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      :pagination="pagination"
      @onReview="handleReview"
      @onIssueWarning="handleEdit"
      @onChangePage="handleChangePage"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
    ></EditDialog>
    <PublishDialog
      :visible="state.publishDialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></PublishDialog>
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
  infoManagementWeatherInfoGetOneByIdRequest,
  infoManagementWeatherInfoGetPageRequest,
  infoManagementWeatherInfoPublishWarningRequest,
  eventManageSuddenEventExportRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import PublishDialog from "./PublishDialog.vue";
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
    width: "1rem",
  },
  {
    label: "日期",
    name: "dataTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "3rem",
  },
  {
    label: "天气来源",
    name: "weatherSource",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "3rem",
  },
  {
    label: "温度（℃）",
    name: "temperature",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "3rem",
  },
  {
    label: "天气",
    name: "weather",
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
    actions: ["detail", "issueWarning"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogVisible: false,
  publishDialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  pagination.total = undefined;
  infoManagementWeatherInfoGetPageRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      pagination.total = response.total;
      state.processedTableData = response.list.map((item: any) => {
        return {
          ...item,
          warningLevel: global
            .$getDictionary("planLevel")
            .find((item2: any) => item2.value === item.warningLevel)?.label,
        };
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleEdit = (rowData: any) => {
  state.publishDialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
};

const handleReview = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "detail";
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
  state.publishDialogVisible = false;
};

const handleSubmit = (formData: any) => {
  infoManagementWeatherInfoPublishWarningRequest(formData)
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

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
