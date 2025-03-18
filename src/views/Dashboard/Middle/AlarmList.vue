<template>
  <Block title="报警列表" class="alarmlist">
    <div
      :style="{
        margin: '0.3rem 0 0 0',
        height: 'calc(100% - 0.6rem)',
        position: 'relative',
      }"
    >
      <BaseTable
        :tableData="state.tableData"
        :processedTableData="state.processedTableData"
        :dataModel="pageModel"
        :pagination="null"
        height="100%"
        tableBodyHeight="100%"
        @onReview="handleReview"
      />
    </div>
    <ReviewEventDialog
      :visible="state.dialogReviewEventVisible"
      :rowData="state.currentRowData"
      :mode="state.dialogMode"
      @onClose="handleClose"
    />
    <ReviewPlanDialog
      :visible="state.dialogReviewPlanVisible"
      :rowData="state.currentRowData"
      :mode="state.dialogMode"
      @onClose="handleClose"
    />
  </Block>
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

import { backendIndexPageGetAlarmInfoDataRequest } from "@/api/management";

import ReviewEventDialog from "./ReviewEventDialog.vue";
import ReviewPlanDialog from "./ReviewPlanDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  timeType: { type: Number, default: 1, required: true },
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
    label: "报警类型",
    name: "alarmLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    colorConfig: {
      colorList: [
        { value: "黄色", color: "yellow" },
        { value: "橙色", color: "orange" },
        { value: "红色", color: "red" },
      ],
    },
  },
  {
    label: "报警内容",
    name: "alarmContent",
    rows: 2,
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警时间",
    name: "alarmTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  // {
  //   label: "报警地点",
  //   name: "source",
  //   required: true,
  //   tableVisible: true,
  //   formVisible: true,
  //   exportVisible: true,
  // },
  {
    label: "查看",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    actions: ["review"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dataModel: [] as any[],
  timeType: 1,
  dialogReviewEventVisible: false,
  dialogReviewPlanVisible: false,
  currentRowData: {},
  dialogMode: "",
});

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});
const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
});

const eventAllList = computed(() => {
  return [
    ...global.$store.state.app.currentEventTypeList[0].data,
    ...global.$store.state.app.currentEventTypeList[1].data,
  ];
});

const handleReview = (rowData: any) => {
  const emergencyPlanList = global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyPlanType
  ).data;
  const emergencyEventList = global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyEventType
  ).data;
  if (
    emergencyPlanList.some(
      (item: any) => Number(item.value) === rowData.preplanResourceId
    )
  ) {
    state.dialogReviewPlanVisible = true;
  }
  if (
    emergencyEventList.some(
      (item: any) => Number(item.value) === rowData.preplanResourceId
    )
  ) {
    state.dialogReviewEventVisible = true;
  }
  state.currentRowData = rowData;
};

const handleClose = () => {
  state.dialogReviewPlanVisible = false;
  state.dialogReviewEventVisible = false;
  global.$store.commit("app/updateTableLoading", false);
};

watch(
  () => props.timeType,
  (newValue: any, oldValue: any) => {
    state.timeType = newValue;
    getData();
  }
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  const timeTypeDictionary = [
    {
      value: 1,
      code: "day",
    },
    {
      value: 2,
      code: "week",
    },
    {
      value: 3,
      code: "month",
    },
  ];
  backendIndexPageGetAlarmInfoDataRequest({
    alarmLevel: null,
    alarmTimeStart: global
      .$dayjs()
      .startOf(
        timeTypeDictionary.find((item: any) => item.value === props.timeType)
          ?.code
      )
      .format("YYYY-MM-DD HH:mm:ss"),
    alarmTimeEnd: global
      .$dayjs()
      .endOf(
        timeTypeDictionary.find((item: any) => item.value === props.timeType)
          ?.code
      )
      .format("YYYY-MM-DD HH:mm:ss"),
    dateType: null,
    preplanResourceId: null,
    ...pagination,
  })
    .then((response: any) => {
      state.tableData = response.data;
      const eventLevel = global.$getDictionary("eventLevel");
      state.processedTableData = response.data.map((item: any) => {
        return {
          ...item,
          alarmLevel: eventLevel.find(
            (item2: any) => item.alarmLevel === Number(item2.value)
          )?.label,
        };
      });
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

<style scoped lang="scss">
.alarmlist {
  display: flex;
  flex-direction: column;
  height: 100%;

  .common_basetable_wrapper {
    height: 100%;
    .header {
      padding: 0.05rem 0.1rem;
      width: 100%;
      height: 0.3rem;
      background-image: linear-gradient(
        to right,
        rgba(68, 121, 255, 1),
        rgba(68, 121, 255, 0)
      );
    }
    :deep(.ant-table-wrapper) {
      height: calc(100% - 0.6rem);
      background-color: transparent;
      .ant-table-wrapper,
      .ant-spin-nested-loading,
      .ant-spin-container {
        height: 100%;
      }
      .ant-table {
        height: calc(100% - 0.45rem) !important;
        background-color: transparent;
      }
      .ant-pagination {
        margin: 0.1rem 0 0 0;
      }
      .ant-table-tbody {
        .ant-table-row {
          &.table-striped,
          &:hover {
            transition: all 0.3s;
            background-image: linear-gradient(
              to right,
              rgba(0, 67, 144, 0) 0%,
              rgba(0, 67, 144, 1) 40%,
              rgba(0, 67, 144, 1) 70%,
              rgba(0, 67, 144, 0) 100%
            );
            > td {
              background-color: transparent;
            }
          }
          &:hover {
            background-image: linear-gradient(
              to right,
              rgb(15, 83, 231) 0%,
              rgba(15, 83, 231, 1) 100%
            );
          }
          .ant-table-cell {
            padding: 0.05rem;
          }
        }
      }
      .ant-table-thead {
        tr {
          .ant-table-cell {
            padding: 0.05rem;
            background-color: #0023a6;
          }
        }
      }
    }
  }
}
</style>
