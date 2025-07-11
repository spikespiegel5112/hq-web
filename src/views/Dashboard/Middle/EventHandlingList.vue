<template>
  <Block title="事件处置列表" class="eventhandlinglist">
    <div class="header">
      <div class="title">
        <span class="left">
          <span></span>
          当日已处理数量
        </span>
        <span class="right">
          <i>
            {{ disposoedEventList.length }}
          </i>
          /
          {{ state.eventList.length }}
        </span>
      </div>
      <div class="progressbar">
        <span
          :style="{
            width: `${(disposoedEventList.length / state.eventList.length) * 100}%`,
          }"
        ></span>
      </div>
    </div>
    <div class="main">
      <vue-scroll>
        <ul>
          <li v-for="item in state.eventList" :key="item.id">
            <div class="title">
              <span class="caution">
                <span class="triangle"></span>
                <ExclamationOutlined />
              </span>
              {{ item.eventContent }}
            </div>
            <div class="content">
              <div class="left">
                <div class="type">
                  <label>上报类别：</label>
                  <span>{{ item.eventType }}</span>
                </div>
                <div class="date">{{ item.eventTime }}</div>
              </div>
              <div class="right">
                <div class="status">
                  <label>状态：</label>
                  <span>
                    {{
                      global.$store.state.dictionary.disposalStatus.find(
                          (item2:any) => item2.value === item.eventStatus
                      )?.label
                    }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </vue-scroll>
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

import { backendIndexPageSuddenEventRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

import { ExclamationOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  timeType: { type: Number, default: 1, required: true },
});

const state = reactive({
  dataModel: [] as any[],
  tableData: [] as any[],
  timeType: 1,
  eventList: [] as any[],
});

const disposoedEventList = computed(() => {
  return state.eventList.filter((item) => item.eventStatus === 2);
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
  const timeTypeList = ["day", "week", "month"];
  backendIndexPageSuddenEventRequest({
    queryDate: global.$dayjs().format("YYYY-MM-DD"),
    timeType: state.timeType,
  })
    .then((response: any) => {
      response = response.data;
      state.eventList = response;
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
.eventhandlinglist {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    margin: 0.3rem auto;
    width: 5rem;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 0 0 10px 0;
      width: 100%;

      .left {
        display: inline-flex;
        flex: 1;
        font-size: 0.2rem;
        color: #dffeff;
        align-items: center;
        span {
          display: inline-block;
          margin: 0 0.1rem 0 0;
          border-style: solid;
          border-width: 0.07rem 0 0.07rem 0.05rem;
          border-color: transparent transparent transparent aqua;
        }
      }
      .right {
        display: inline-block;
        width: 2rem;
        font-size: 0.2rem;
        text-align: right;
        color: #778687;
        i {
          display: inline-block;
          padding: 0 0.1rem;
          color: #fff;
          font-size: 0.3rem;
          font-style: normal;
        }
      }
    }
    .progressbar {
      display: block;
      width: 100%;
      height: 5px;
      position: relative;
      background-color: #19325d;
      span {
        display: block;
        height: 100%;
        background-image: linear-gradient(
          to right,
          rgba(0, 247, 255, 0),
          rgba(0, 247, 255, 1)
        );
        border-radius: 0.1rem;
        position: absolute;
        top: 0;
        left: 0;
        &:after {
          content: "";
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          background-color: aqua;
          border-radius: 50%;
          position: absolute;
          top: -0.014rem;
          right: 0;
        }
      }
    }
  }
  .main {
    height: calc(100% - 1rem);
    ul {
      height: 100%;
      overflow: auto;
      li {
        margin: 0 0 0.1rem 0;
        padding: 0 0.2rem;
        width: 100%;
        background-color: #001a3f;
        transition: all 0.3s;
        &:hover {
          background-color: #002d6a;
          box-shadow: 0 0 0.15rem 0 #1d50f5 inset;
        }
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
