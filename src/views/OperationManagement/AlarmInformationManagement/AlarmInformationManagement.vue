<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="import">导入</a-button>
        <ExportButton
          :action="operationManagementAlarmInfoExportExcelRequest"
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
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      :pagination="pagination"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
    />
    <ReviewEventDialog
      :visible="state.dialogReviewEventVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    >
    </ReviewEventDialog>

    <ReviewPlanDialog
      :visible="state.dialogReviewPlanVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    >
    </ReviewPlanDialog>
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
  operationManagementAlarmInfoGetPageRequest,
  operationManagementAlarmInfoDeleteRequest,
  operationManagementAlarmInfoSaveRequest,
  operationManagementAlarmInfoExportExcelRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import ReviewEventDialog from "./ReviewEventDialog.vue";
import ReviewPlanDialog from "./ReviewPlanDialog.vue";

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
    label: "预警类型",
    name: "preplanResourceId",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "内容",
    name: "alarmContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "级别",
    name: "alarmLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "日期类型",
    name: "dateType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "日期",
    name: "alarmTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "告警状态",
    name: "alarmStatus",
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
    actions: ["review"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogReviewEventVisible: false,
  dialogReviewPlanVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const eventAllList = computed(() => {
  return [
    ...global.$store.state.app.currentEventTypeList[0].data,
    ...global.$store.state.app.currentEventTypeList[1].data,
  ];
});

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  operationManagementAlarmInfoGetPageRequest({
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
          dutyStartTime: global.$dayjs(item.dutyStartTime).format("YYYY-MM-DD"),
          dutyEndTime: global.$dayjs(item.dutyEndTime).format("YYYY-MM-DD"),
          preplanResourceId: eventAllList.value.find(
            (item2: any) => item2.value === item.preplanResourceId.toString()
          )?.label,
          alarmTime: global.$dayjs(item.alarmTime).format("YYYY-MM-DD"),
          alarmLevel: global
            .$getDictionary("alarmLevel")
            .find((item2: any) => item2.value === item.alarmLevel)?.label,
          dateType: global
            .$getDictionary("dateType")
            .find((item2: any) => item2.value === item.dateType)?.label,
          alarmStatus: global
            .$getDictionary("alarmStatus")
            .find((item2: any) => item2.value === item.alarmStatus)?.label,
        };
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleEdit = (rowData: any) => {
  state.dialogReviewEventVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
};

const handleReview = (rowData: any) => {
  state.dialogReviewEventVisible = true;
  state.dialogMode = "review";
  state.currentRowData = rowData;
};

const handleAdd = () => {
  state.dialogReviewEventVisible = true;
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
  state.dialogReviewEventVisible = false;
  global.$store.commit("app/updateTableLoading", false);
};

const handleSubmit = (formData: any) => {
  operationManagementAlarmInfoSaveRequest(formData)
    .then((response: any) => {
      global.$message.success("操作成功");
      getData();
    })
    .catch((error: any) => {
      global.$message.error("操作失败");
      console.log(error);
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  operationManagementAlarmInfoDeleteRequest({
    id,
  })
    .then((response: any) => {
      global.$message.success("删除成功");
      getData();
    })
    .catch((error: any) => {
      global.$message.error("删除失败");
      console.log(error);
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
