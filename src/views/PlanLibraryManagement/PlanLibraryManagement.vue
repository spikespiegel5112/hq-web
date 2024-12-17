<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="PlanLibraryManagementNonRoutineEvents" tab="非日常事件">
        <PlanLibraryManagementNonRoutineEvents />
      </a-tab-pane>
      <a-tab-pane key="EmergencyPlan" tab="应急预案">
        <PlanLibraryManagementEmergencyPlan />
      </a-tab-pane>
      <a-tab-pane key="ExternalInformation" tab="外部信息">
        <PlanLibraryManagementExternalInformation />
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

import PlanLibraryManagementNonRoutineEvents from "./PlanLibraryManagementNonRoutineEvents.vue";
import PlanLibraryManagementEmergencyPlan from "./PlanLibraryManagementEmergencyPlan.vue";
import PlanLibraryManagementExternalInformation from "./PlanLibraryManagementExternalInformation.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});

const state = reactive({
  activeKey: "PlanLibraryManagementNonRoutineEvents",
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
