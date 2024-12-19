<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="TabEmergencyEventHandling" tab="非日常事件">
        <TabEmergencyEventHandling />
      </a-tab-pane>
      <a-tab-pane key="TabEmergencyPlanHandling" tab="应急预案">
        <TabEmergencyPlanHandling />
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

import TabEmergencyEventHandling from "./TabEmergencyEventHandling.vue";
import TabEmergencyPlanHandling from "./TabEmergencyPlanHandling.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});

const state = reactive({
  activeKey: "TabEmergencyEventHandling",
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
