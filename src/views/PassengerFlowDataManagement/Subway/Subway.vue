<template>
  <div class="common_tab_container">
    <a-tabs v-model="state.activeKey" @change="handleChangeTab">
      <a-tab-pane
        v-for="item in global.$getDictionary('metro_station_code')"
        :key="item.value"
        :tab="item.label"
      >
        <SubwayTrain v-if="state.activeKey === '05-19-10'" :capPlace="item" />
        <SubwayTerminal2
          v-if="state.activeKey === '04-17-03'"
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

import SubwayTerminal2 from "./SubwayTerminal2.vue";
import SubwayTrain from "./SubwayTrain.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const componentMap = ref([
  {
    code: "P-TPL-RailwayS",
    componentName: "SubwayTrain",
  },
  {
    code: "P-TPL-RailwayN",
    componentName: "SubwayTerminal2",
  },
  {
    code: "P-TPL-UrbanRailway",
    componentName: "TaxiUrbanRail",
  },
]);

const state = reactive({
  activeKey: "05-19-10" as string | undefined,
  parkingLotData: [] as any[],
});

const handleChangeTab = (value: any) => {
  state.activeKey = value;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
