<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="TabEmergencyEvent" tab="突发事件处置">
        <TabEmergencyEvent />
      </a-tab-pane>
      <a-tab-pane key="TabEmergencyPlan" tab="应急预案处置">
        <TabEmergencyPlan />
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
  toRaw,
} from "vue";

import TabEmergencyEvent from "./TabEmergencyEvent.vue";
import TabEmergencyPlan from "./TabEmergencyPlan.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});

const state = reactive({
  activeKey: "TabEmergencyEvent",
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
