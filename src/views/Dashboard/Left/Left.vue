<template>
  <div class="dashboardleft">
    <div class="top common_block_wrapper">
      <CurrentPassengerFlow />
      <a-row>
        <a-col :span="12" class="evacuationofpassengerflow">
          <EvacuationOfPassengerFlow />
        </a-col>
        <a-col :span="12" class="hourlypassengerflow">
          <HourlyPassengerFlow />
        </a-col>
      </a-row>
      <AccumulatedEvacuationOfPassengerFlowOnTheSameDay />
    </div>
    <div class="bottom common_block_wrapper">
      <Taxi />
    </div>
    <div class="main"></div>
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

import CurrentPassengerFlow from "./CurrentPassengerFlow.vue";
import EvacuationOfPassengerFlow from "./EvacuationOfPassengerFlow.vue";
import HourlyPassengerFlow from "./HourlyPassengerFlow.vue";
import AccumulatedEvacuationOfPassengerFlowOnTheSameDay from "./AccumulatedEvacuationOfPassengerFlowOnTheSameDay.vue";
import Taxi from "./Taxi.vue";

import dayjs from "dayjs";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const state = reactive({
  bannerInfo: {},
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardleft {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.9rem);
  // color: #fff;

  .top {
    margin: 0 0 0.15rem 0;
    width: 100%;
    height: 55%;
    min-height: 42%;
    position: relative;
  }
  .bottom {
    position: relative;
  }
  .middle {
    margin: 0 0 0.15rem 0;
    align-items: start;
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
    height: 45%;
    min-height: 3rem;
  }
}
</style>
