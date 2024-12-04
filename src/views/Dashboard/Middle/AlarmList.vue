<template>
  <Block title="报警列表" class="alarmlist">
    <div class="choosedate">
      <ul>
        <li class="active">
          <a href="javascript:;"> 今日 </a>
        </li>
        <li>
          <a href="javascript:;"> 本周 </a>
        </li>
        <li>
          <a href="javascript:;"> 当月 </a>
        </li>
      </ul>
    </div>
    <div
      :style="{
        height: 'calc(100% - 0.1rem)',
        position: 'relative',
      }"
    >
      <BaseTable
        :tableData="state.tableData"
        :dataModel="pageModel"
        height="100%"
        tableBodyHeight="calc(100% - 0.35rem)"
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

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

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
    label: "id",
    name: "id",
    required: false,
    tableVisible: false,
    formVisible: true,
    exportVisible: false,
  },
  {
    label: "报警类型",
    name: "higywayCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警内容",
    name: "highwayName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警时间",
    name: "bridgeCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "报警地点",
    name: "bridgeName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "查看",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    actions: ["view"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dataModel: [] as any[],
});

const init = () => {};
const getData = () => {
  state.tableData = [
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
    {
      higywayCode: "aaa",
      highwayName: "aaa",
      bridgeCode: "aaa",
      bridgeName: "aaa",
    },
  ];
};

onMounted(async () => {
  init();
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.alarmlist {
  display: flex;
  flex-direction: column;
  height: 100%;
  .choosedate {
    position: absolute;
    top: 0;
    right: 0;
    ul {
      li {
        display: inline-block;
        margin: 0 0 0 0.2rem;
        border: 1px solid #004390;
        background-color: #00284d;
        position: relative;
        &:before {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-color: transparent;
          border-width: 0.05rem;
          position: absolute;
          top: 0;
          left: 0;
        }
        a {
          display: inline-block;
          padding: 0.04rem 0.15rem;
          width: 100%;
          height: 100%;
          color: #fff;
        }
        &.active {
          color: #fff;
          border: 1px solid #23dbfc;
          &:before {
            border-color: #23dbfc transparent transparent #23dbfc;
          }
        }
      }
    }
  }
  .common_basetable_wrapper {
    margin: 0.3rem 0 0 0;
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
      .ant-spin-container,
      .ant-table {
        height: 100%;
      }
      .ant-table {
        height: calc(100% - 0.8rem);
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
