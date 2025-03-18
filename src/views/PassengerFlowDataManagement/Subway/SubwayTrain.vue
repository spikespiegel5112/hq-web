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
        <ExportButton
          :action="passengerFlowMetroPassengerFlowExportRequest"
          :queryFormData="queryFormData"
          :disabled="
            !global.$checkAuth(global, 'eventManage:suddenEvent:export')
          "
        />
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      :loading="global.$store.state.app.tableLoading"
      :tablePermissionCodeListWithAction="tablePermissionCodeListWithAction"
      tabTable
      statisticTable2
      :pagination="pagination"
      @onEdit="handleEdit"
      @onReview="handleReview"
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
  passengerFlowMetroPassengerFlowGetPageRequest,
  passengerFlowMetroPassengerFlowgGetStatisticsRequest,
  passengerFlowMetroPassengerFlowExportRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import Statistic from "./Statistic.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  capPlace: { type: Object, default: null, required: true },
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
    name: "statisticalTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
]);

const state = reactive({
  tableData: [] as any[],
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
      code: "passengerFlow:metroPassengerFlow:save",
      action: "edit",
    },
    {
      code: "passengerFlow:metroPassengerFlow:delete",
      action: "delete",
    },
    {
      code: "passengerFlow:metroPassengerFlow:getOneById",
      action: "review",
    },
    {
      code: "passengerFlow:metroPassengerFlow:importExcel",
      action: "importExcel",
    },
    {
      code: "passengerFlow:metroPassengerFlow:exportExcel",
      action: "exportExcel",
    },
    {
      code: "passengerFlow:metroPassengerFlow:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "passengerFlow:metroPassengerFlow:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  passengerFlowMetroPassengerFlowGetPageRequest({
    ...queryFormData,
    ...pagination,
    metroStationCode: props.capPlace.value,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list.map((item: any) => {
        return {
          ...item,
          metroStationCode: global
            .$getDictionary("metro_station_code")
            .find((item2: any) => {
              return item2.value === item.metroStationCode;
            })?.label,
        };
      });
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

const handleSearch = (formData: object) => {
  global.$store.commit("app/updateTableLoading", true);
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

const getStatisticData = () => {
  passengerFlowMetroPassengerFlowgGetStatisticsRequest({
    metroStationCode: props.capPlace.value,
  })
    .then((response: any) => {
      state.statisticData = response.data;
    })
    .catch((error: any) => {
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
