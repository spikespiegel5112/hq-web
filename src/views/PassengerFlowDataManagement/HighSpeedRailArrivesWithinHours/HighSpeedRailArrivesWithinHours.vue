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
          :action="eventManageSuddenEventExportRequest"
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
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      :pagination="pagination"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
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
  backendRailwayArriveGetRailwayArrivePagingRequest,
  backendRailwayArriveRailwayArriveExportRequest,
  backendRailwayArriveSaveRailwayArriveRequest,
  backendRailwayArriveDeleteRequest,
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
    label: "日期",
    name: "statisticalDate",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "统计开始时间",
    name: "statisticalBeginHour",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "小时疏散数",
    name: "dispersedHourlyPassengerCount",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "预测小时到达数",
    name: "estimatedHourlyArrivePassengerCount",
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

const getData = () => {
  backendRailwayArriveGetRailwayArrivePagingRequest({
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
            statisticalDate: global
              .$dayjs(item.statisticalDate)
              .format("YYYY年M月DD日"),
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
  backendRailwayArriveDeleteRequest({ id })
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
  backendRailwayArriveRailwayArriveExportRequest()
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
