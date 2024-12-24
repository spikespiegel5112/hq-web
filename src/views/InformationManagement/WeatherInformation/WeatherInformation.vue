<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="export">导出</a-button>
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
  infoManagementWeatherInfoGetOneByIdRequest,
  infoManagementWeatherInfoGetPageRequest,
  infoManagementWeatherInfoPublishWarningRequest,
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
    label: "日期",
    name: "dataTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "天气来源",
    name: "weatherSource",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2rem",
  },
  {
    label: "温度（℃）",
    name: "temperature",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "天气",
    name: "weather",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "预警类型",
    name: "warningType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "预警内容",
    name: "warningContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "级别",
    name: "warningLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "操作",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    fixed: "right",
    actions: ["review", "issueWarning"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogVisible: false,
  dialogDisposalVisible: false,
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
  state.dialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
};

const handleReview = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "review";
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
