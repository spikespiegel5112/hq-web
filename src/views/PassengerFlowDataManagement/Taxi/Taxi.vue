<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane
        v-for="item in state.parkingLotData"
        :key="item.value"
        :tab="item.label"
      >
        <TaxiHighSpeedRailSouth
          v-if="state.activeKey === 'TaxiHighSpeedRailSouth'"
          :parkCode="item.value"
        />
        <TaxiHighSpeedRailNorth
          v-if="state.activeKey === 'TaxiHighSpeedRailNorth'"
          :parkCode="item.value"
        />
        <TaxiUrbanRail
          v-if="state.activeKey === 'TaxiUrbanRail'"
          :parkCode="item.value"
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const componentMap = ref([
  {
    code: "P-TPL-RailwayS",
    componentName: "TaxiHighSpeedRailSouth",
  },
  {
    code: "P-TPL-RailwayN",
    componentName: "TaxiHighSpeedRailNorth",
  },
  {
    code: "P-TPL-UrbanRailway",
    componentName: "TaxiUrbanRail",
  },
]);

const state = reactive({
  activeKey: "TaxiHighSpeedRailNorth" as string | undefined,
  parkingLotData: [] as any[],
});

const getParkingLotData = () => {
  state.parkingLotData = global.$getDictionary("storage_park_code");
};

const handleChangeTab = (value: any) => {
  state.activeKey = componentMap.value.find(
    (item: any) => item.code === value
  )?.componentName;
};

onMounted(async () => {
  getParkingLotData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
