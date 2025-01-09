<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane
        v-for="item in global.$getDictionary('e_hailling_cap_place')"
        :key="item.value"
        :tab="item.label"
      >
        <OnlineCarHailingSouth v-if="state.activeKey === 0" :capPlace="item" />
        <OnlineCarHailingNorth v-if="state.activeKey === 1" :capPlace="item" />
        <OnlineCarHailingNorth v-if="state.activeKey === 2" :capPlace="item" />
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
  activeKey: 0,
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
