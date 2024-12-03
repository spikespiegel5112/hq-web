<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="GarageTrafficInformationP9P10" tab="P9 P10">
        <GarageTrafficInformationP9P10 />
      </a-tab-pane>
      <a-tab-pane
        key="GarageTrafficInformationQuickPickupPointNorth"
        tab="快速上客点北"
      >
        <GarageTrafficInformationQuickPickupPointNorth />
      </a-tab-pane>
      <a-tab-pane
        key="GarageTrafficInformationQuickPickupPointWest"
        tab="快速上客点西"
      >
        <GarageTrafficInformationQuickPickupPointWest />
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

import GarageTrafficInformationQuickPickupPointNorth from "./GarageTrafficInformationQuickPickupPointNorth.vue";
import GarageTrafficInformationQuickPickupPointWest from "./GarageTrafficInformationQuickPickupPointWest.vue";
import GarageTrafficInformationP9P10 from "./GarageTrafficInformationP9P10.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  activeKey: "GarageTrafficInformationP9P10",
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
