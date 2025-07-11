<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane
        v-for="item in state.parkingLotData"
        :key="item.value"
        :tab="item.label"
      >
        <TaxiHighSpeedRailNorth
          v-if="state.activeKey === 'TaxiHighSpeedRailNorth'"
          :parkCode="item.value"
          :statisticData="state.statisticData"
        />
        <TaxiHighSpeedRailSouth
          v-if="state.activeKey === 'TaxiHighSpeedRailSouth'"
          :parkCode="item.value"
          :statisticData="state.statisticData"
        />
        <TaxiUrbanRail
          v-if="state.activeKey === 'TaxiUrbanRail'"
          :parkCode="item.value"
          :statisticData="state.statisticData"
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

import TaxiHighSpeedRailNorth from "./TaxiHighSpeedRailNorth.vue";
import TaxiHighSpeedRailSouth from "./TaxiHighSpeedRailSouth.vue";
import TaxiUrbanRail from "./TaxiUrbanRail.vue";

import { passengerFlowStorageGetStatisticsRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const componentMap = ref([
  {
    code: "P-TPL-RailwayN",
    componentName: "TaxiHighSpeedRailNorth",
  },
  {
    code: "P-TPL-RailwayS",
    componentName: "TaxiHighSpeedRailSouth",
  },
  {
    code: "P-TPL-UrbanRailway",
    componentName: "TaxiUrbanRail",
  },
]);

const state = reactive({
  activeKey: "TaxiHighSpeedRailNorth" as string | undefined,
  parkingLotData: [] as any[],
  statisticData: {},
});

const getParkingLotData = () => {
  state.parkingLotData = global.$getDictionary("storage_park_code");
};

const handleChangeTab = (value: any) => {
  const currentCompoennt: any = componentMap.value.find(
    (item: any) => item.code === value
  );
  state.activeKey = currentCompoennt?.componentName;
  getStatisticData({
    parkCode: currentCompoennt.code,
  });
};

const getStatisticData = (params: any) => {
  passengerFlowStorageGetStatisticsRequest({
    ...params,
  })
    .then((response: any) => {
      state.statisticData = response.data;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {
  getParkingLotData();
  handleChangeTab(componentMap.value[0].code);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
