<template>
  <Block title="报警列表" class="alarmlist">
    <div class="choosedate">
      <ul>
        <li>
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
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      height="calc(100vh - 7rem)"
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

import { screenBannerInfoRequest } from "@/api/screen";

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
  height: calc(100vh - 1.68rem);
  .choosedate {
    ul {
      li {
        
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
