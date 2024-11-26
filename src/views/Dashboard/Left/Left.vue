<template>
  <div class="dashboardleft">
    <div class="top">
      <div class="currentpassengerflowquantity">
        <span class="icon"></span>
        <div class="detail">
          <span class="title">当前客流数量</span>
          <div class="data">
            <span class="number">1231</span>
            <span class="unit">人次</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle common_block_wrapper">
      <a-row>
        <a-col :span="12" class="evacuationofpassengerflow">
          <EvacuationOfPassengerFlow />
        </a-col>
        <a-col :span="12" class="hourlypassengerflow">
          <HourlyPassengerFlow />
        </a-col>
      </a-row>
      <a-row>
        <a-col
          :span="24"
          class="accumulatedevacuationofpassengerflowonthesameday"
        >
          <AccumulatedEvacuationOfPassengerFlowOnTheSameDay />
        </a-col>
      </a-row>
    </div>
    <div class="bottom common_block_wrapper">
      <a-row>
        <a-col
          :span="24"
          class="accumulatedevacuationofpassengerflowonthesameday"
        >
          <Taxi />
        </a-col>
      </a-row>
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

import EvacuationOfPassengerFlow from "./EvacuationOfPassengerFlow.vue";
import HourlyPassengerFlow from "./HourlyPassengerFlow.vue";
import AccumulatedEvacuationOfPassengerFlowOnTheSameDay from "./AccumulatedEvacuationOfPassengerFlowOnTheSameDay.vue";
import Taxi from "./Taxi.vue";

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
  // color: #fff;
  .top {
    width: 100%;
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
  .middle {
    margin: 0 0 0.25rem 0;
    align-items: start;
    .evacuationofpassengerflow {
      display: inline-block;
      width: 50%;
    }
    .hourlypassengerflow {
      display: inline-block;
      width: 50%;
    }
    .accumulatedevacuationofpassengerflowonthesameday {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
