<template>
  <Block title="事件处置列表" class="eventhandlinglist">
    <div class="header">
      <div class="title">
        <span class="left">当日已处理数量</span>
        <span class="right">4/12</span>
      </div>
      <div class="progressbar">
        <span
          :style="{
            width: '50%',
          }"
        ></span>
      </div>
    </div>
    <div class="main">
      <ul>
        <li>
          <div class="title">
            <span class="caution">
              <span class="triangle"></span>
              <ExclamationOutlined />
            </span>
            高铁到达客流预计36万
          </div>
          <div class="content">
            <div class="left">
              <div class="type">
                <label>上报类别：</label>
                <span>大客流应急保障</span>
              </div>
              <div class="date">2024-07-20 12:23</div>
            </div>
            <div class="right">
              <div class="status">
                <label>状态：</label>
                <span>处置中</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
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

import { screenBannerInfoRequest } from "@/api/screen";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

import { ExclamationOutlined } from "@ant-design/icons-vue";

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
.eventhandlinglist {
  display: flex;
  flex-direction: column;
  .header {
    margin: 0.3rem auto;
    width: 5rem;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 0 0 10px 0;
      width: 100%;

      .left {
        display: inline-block;
        flex: 1;
        font-size: 0.2rem;
        color: #dffeff;
      }
      .right {
        display: inline-block;
        width: 2rem;
        font-size: 0.2rem;
        text-align: right;
      }
    }
    .progressbar {
      display: block;
      width: 100%;
      height: 5px;
      position: relative;
      span {
        display: block;
        height: 100%;
        background-color: red;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .main {
    ul {
      li {
        padding: 0 0.2rem;
        width: 100%;
        background-color: #001a3f;
        .title {
          display: flex;
          align-items: center;
          margin: 0 0 0.15rem 0;
          padding: 0.1rem 0;
          font-size: 0.2rem;
          border-bottom: 1px solid #003cff;
          .caution {
            display: inline-block;
            margin: 0 0.1rem 0 0;
            width: 0.2rem;
            height: 0.2rem;
            position: relative;
            text-align: center;

            .triangle {
              display: inline-block;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 0.1rem 0.2rem 0.1rem;
              border-color: transparent transparent red transparent;
              position: absolute;
              top: 0;
              left: 0;
            }
            :deep(.anticon) {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0.025rem;
              top: 0.01rem;
              font-size: 0.15rem;
              color: #000;
              text-align: center;
            }
          }
        }
        .content {
          display: flex;
          .left {
            display: inline-block;
            width: 3rem;
            .type {
              label {
                color: aqua;
              }
              span {
                color: #fff;
              }
            }
            .date {
              padding: 0.15rem 0 0.3rem 0;
            }
          }
          .right {
            display: inline-block;
            flex: 1;
            .status {
              label {
                color: aqua;
              }
              span {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
