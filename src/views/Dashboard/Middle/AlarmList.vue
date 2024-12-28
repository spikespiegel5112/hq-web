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
        :dataModel="pageModel"
        height="100%"
        tableBodyHeight="calc(100% - 0.4rem)"
      />
    </div>
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  timeType: { type: Number, default: 1, required: true },
});
// "id": 36,
//             "preplanResourceId": 111,
//             "eventAssociationId": 94,
//             "": "区域人数统计超阈值范围告警",
//             "": 0,
//             "": "2024-12-28 19:39:35",
//             "alarmLevel": 0,
//             "alarmStatus": 1,
//             "createBy": null,
//             "createTime": "2024-12-27 22:03:22",
//             "updateBy": null,
//             "updateTime": "2024-12-27 22:03:22",
//             "preplanEventType": null
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
    name: "dateType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警内容",
    name: "alarmContent",
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
  dataModel: [] as any[],
  timeType: 1,
});

watch(
  () => props.timeType,
  (newValue: any, oldValue: any) => {
    state.timeType = newValue;
    getData();
  }
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  backendIndexPageGetAlarmInfoDataRequest({
    alarmLevel: null,
    alarmTimeEnd: null,
    alarmTimeStart: null,

    dateType: null,
    page: 1,
    pageSize: 10,
    preplanResourceId: null,
  })
    .then((response: any) => {
      state.tableData = response.data;
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
      height: 100%;
      background-color: transparent;
      .ant-table-wrapper,
      .ant-spin-nested-loading,
      .ant-spin-container {
        height: 100%;
      }
      .ant-table {
        height: calc(100% - 0.6rem) !important;
        background-color: transparent;
      }
      .ant-pagination {
        margin: 0.1rem 0 0 0;
      }
      .ant-table-container {
        height: 100%;
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
}
</style>
