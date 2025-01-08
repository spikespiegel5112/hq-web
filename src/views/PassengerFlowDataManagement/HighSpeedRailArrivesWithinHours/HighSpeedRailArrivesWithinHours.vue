<template>
  <div class="common_table_wrapper">
    <Statistic :statisticData="state.statisticData" />
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          label="导入"
          :action="backendRailwayArriveImportPicRequest"
          @success="(response:any) => saveMulripleData(response)"
        />
        <ExportButton
          :action="backendRailwayArriveRailwayArriveExportRequest"
          :queryFormData="queryFormData"
        />
        <a-button class="yellow" @click="handleAddSummarizedData">
          新增汇总数据
        </a-button>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      :pagination="pagination"
      statisticTable
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    />
    <SummarizeDataDialog
      :visible="state.dialogSummarizeDataVisible"
      @onClose="handleClose"
      @onSubmit="handleSubmitSummarizeData"
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
  backendRailwayArriveImportPicRequest,
  backendRailwayArriveSaveRailwayArriveBatchRequest,
  passengerFlowMetroPassengerFlowGetStatisticsRequest,
} from "@/api/management";
import Statistic from "./Statistic.vue";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import SummarizeDataDialog from "./SummarizeDataDialog.vue";

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
  {
    label: "出发列次",
    name: "estimatedHourlyArrivePassengerCount",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "到达列次",
    name: "estimatedHourlyArrivePassengerCount",
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
  processedTableData: [] as any[],
  dialogVisible: false,
  dialogSummarizeDataVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
  statisticData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});
const env = computed(() => {
  return import.meta.env;
});

watch(
  () => queryFormData,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
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
            statisticalBeginHour: global
              .$getDictionary("railway_statistical_begin_hour")
              .find((item2: any) => item2.value === item.statisticalBeginHour)
              .label,
          };
        }
      );
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getStatisticData = () => {
  passengerFlowMetroPassengerFlowGetStatisticsRequest({
    ...queryFormData,
  })
    .then((response: any) => {
      state.statisticData = response.data;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const saveMulripleData = (formData: any) => {
  const payload = [] as any[];
  formData = formData.data;
  formData.forEach((item: any) => {
    payload.push({
      dispersedHourlyPassengerCount: item.dispersedHourlyPassengerCount,
      estimatedHourlyArrivePassengerCount:
        item.estimatedHourlyArrivePassengerCount,
      id: item.id,
      railwayArrive: item.railwayArrive,
      railwayDeparture: item.railwayDeparture,
      statisticalBeginHour: item.statisticalBeginHour,
      statisticalDate: item.statisticalDate,
    });
  });

  backendRailwayArriveSaveRailwayArriveBatchRequest(payload)
    .then((response: any) => {
      response = response.data;
      global.$message.success("导入成功");
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("导入失败");
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

const handleAddSummarizedData = () => {
  state.dialogSummarizeDataVisible = true;
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
  state.dialogSummarizeDataVisible = false;
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

const handleSubmitSummarizeData = (formData: any) => {
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

onMounted(async () => {
  getData();
  getStatisticData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
