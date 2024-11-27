<template>
  <div class="dashboardmiddle">
    <div class="top common_block_wrapper">
      <AlarmList />
    </div>
    <div class="bottom"></div>
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

import { screenBannerInfoRequest } from "@/api/screen";
import dayjs from "dayjs";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  stuffDutyList: [] as any[],
  bannerInfo: {},
});

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById("line-scale");
  lineScaleEl.style.display = "none";
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardleft {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.1rem);
  // color: #fff;
  .top {
    width: 100%;
    height: 1rem;
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
  .main {
    height: calc(100% - 1.1rem);
    overflow: auto;
    .middle {
      margin: 0 0 0.15rem 0;
      align-items: start;
      height: 49%;
      .evacuationofpassengerflow {
        display: inline-block;
        width: 50%;
      }
      .hourlypassengerflow {
        display: inline-block;
        width: 50%;
      }
    }
    .bottom {
      height: 49%;
      position: relative;
    }
  }
}
</style>
