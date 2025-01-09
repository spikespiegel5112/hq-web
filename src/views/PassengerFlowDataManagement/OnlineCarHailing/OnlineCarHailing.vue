<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane v-for="item in state.parkingLotData" :key="item" :tab="item">
        <OnlineCarHailingSouth
          v-if="state.activeKey === '北蓄车场'"
          :capPlace="item"
        />
        <OnlineCarHailingNorth
          v-if="state.activeKey === '南蓄车场'"
          :capPlace="item"
        />
      </a-tab-pane>
    </a-tabs>
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

import { passengerFloweEHailingParkingGetCapPlaceRequest } from "@/api/management";

import OnlineCarHailingNorth from "./OnlineCarHailingNorth.vue";
import OnlineCarHailingSouth from "./OnlineCarHailingSouth.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const componentMap = ref([
  {
    code: "P-TPL-RailwayS",
    componentName: "OnlineCarHailingSouth",
  },
  {
    code: "P-TPL-RailwayN",
    componentName: "OnlineCarHailingNorth",
  },
  {
    code: "P-TPL-UrbanRailway",
    componentName: "TaxiUrbanRail",
  },
]);

const state = reactive({
  activeKey: "" as string | undefined,
  parkingLotData: [] as any[],
});

const getParkingLotData = () => {
  passengerFloweEHailingParkingGetCapPlaceRequest()
    .then((response: any) => {
      state.parkingLotData = response.data;
      state.activeKey = state.parkingLotData[0];
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTab = (value: any) => {
  state.activeKey = value;
};

onMounted(async () => {
  getParkingLotData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
