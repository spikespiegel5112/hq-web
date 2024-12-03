<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="TaxiHighSpeedRail" tab="出租车（高铁）">
        <TaxiHighSpeedRail />
      </a-tab-pane>
      <a-tab-pane key="TaxiUrbanRail" tab="出租车（市域铁）">
        <TaxiUrbanRail />
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

import TaxiHighSpeedRail from "./TaxiHighSpeedRail.vue";
import TaxiUrbanRail from "./TaxiUrbanRail.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  activeKey: "TaxiHighSpeedRail",
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
