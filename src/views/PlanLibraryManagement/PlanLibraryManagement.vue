<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="TabNonRoutineEvents" tab="非日常事件">
        <TabNonRoutineEvents />
      </a-tab-pane>
      <a-tab-pane key="TabEmergencyPlan" tab="应急预案">
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

import TabNonRoutineEvents from "./TabNonRoutineEvents.vue";
import TabEmergencyPlan from "./TabEmergencyPlan.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});

const state = reactive({
  activeKey: "TabNonRoutineEvents",
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
