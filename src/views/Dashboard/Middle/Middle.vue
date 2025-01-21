<template>
  <div class="dashboardmiddle">
    <div class="top common_block_wrapper">
      <div class="choosedate">
        <ul>
          <li
            :class="{ active: state.timeType === item.value }"
            v-for="item in timeTypeList"
            :key="item.value"
          >
            <a
              href="javascript:;"
              @click="handleChooseAlarmTimeType(item.value)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
      <AlarmList :timeType="state.timeType" />
    </div>
    <div class="bottom common_block_wrapper">
      <EventHandlingList :timeType="state.timeType" />
    </div>
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

import AlarmList from "./AlarmList.vue";
import EventHandlingList from "./EventHandlingList.vue";

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const timeTypeList = [
  {
    label: "今日",
    value: 1,
  },
  {
    label: "本周",
    value: 2,
  },
  {
    label: "当月",
    value: 3,
  },
];

const state = reactive({
  timeType: 1,
});

const handleChooseAlarmTimeType = (timeType: number) => {
  state.timeType = timeType;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardmiddle {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.9rem);
  position: relative;
  // color: #fff;
  .top {
    margin: 0 0 0.15rem 0;
    width: 100%;
    height: 55%;
    .currentpassengerflowquantity {
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 1rem;
        height: 1rem;
      }
      .detail {
        display: flex;
        flex: 1;
        height: 0.5rem;
        font-size: 0.2rem;
        text-align: left;
        align-items: center;
        background-image: linear-gradient(
          to right,
          rgba(18, 105, 146, 1),
          rgba(18, 105, 146, 0)
        );
        .title {
          display: inline-block;
          padding: 0 0 0 0.2rem;
          width: 3rem;
        }

        .data {
          display: inline-block;
          flex: 1;
          .number {
            display: inline-block;
            margin: 0 0.1rem 0 0;
            color: #f1bc4d;
            font-size: 0.3rem;
          }
          .unit {
            font-size: 0.16rem;
          }
        }
      }
    }
  }

  .bottom {
    height: 45%;
    position: relative;
  }

  .choosedate {
    position: absolute;
    right: 0.25rem;
    z-index: 1;
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
}
</style>
