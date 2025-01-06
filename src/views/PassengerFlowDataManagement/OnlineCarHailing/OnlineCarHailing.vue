<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane
        v-for="item in state.parkingLotData"
        :key="item.value"
        :tab="item.label"
      >
        <!-- <OnlineCarHailingSouth
          v-if="state.activeKey === 'OnlineCarHailingSouth'"
          :parkCode="item.value"
        />
        <OnlineCarHailingNorth
          v-if="state.activeKey === 'OnlineCarHailingNorth'"
          :parkCode="item.value"
        />
        <TaxiUrbanRail
          v-if="state.activeKey === 'TaxiUrbanRail'"
          :parkCode="item.value"
        /> -->
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
import TaxiUrbanRail from "./TaxiUrbanRail.vue";

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
  activeKey: "OnlineCarHailingSouth" as string | undefined,
  parkingLotData: [] as any[],
});

const getParkingLotData = () => {
  state.parkingLotData = global.$getDictionary("storage_park_code");
};

const getData = () => {
  passengerFloweEHailingParkingGetCapPlaceRequest()
    .then((response: any) => {})
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTab = (value: any) => {
  state.activeKey = componentMap.value.find(
    (item: any) => item.code === value
  )?.componentName;
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
