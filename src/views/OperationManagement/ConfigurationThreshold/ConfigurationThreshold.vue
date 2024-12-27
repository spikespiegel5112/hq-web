<template>
  <div class="configurationcommon">
    <a-tabs
      class="common_tab_container"
      v-model:activeKey="state.activeKey"
      @tabClick="handleChangeTab"
    >
      <a-tab-pane
        v-for="item in global.$getDictionary('dateFeaturesType')"
        :key="item.value"
        :tab="item.label"
      >
        <component
          :is="ConfigurationThresholdTab"
          :dateType="item.value"
          :activeTabId="state.activeKey"
        ></component>
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

import ConfigurationThresholdTab from "./ConfigurationThresholdTab.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  visible: false,
  activeKey: "",
  formData: {},
});

const getData = () => {
  init();
};

const init = () => {
  const dateFeaturesTypeList = global.$getDictionary("dateFeaturesType");
  state.activeKey = dateFeaturesTypeList[0].name;
};

const handleChangeTab = (activeKey: any) => {};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.configurationcommon {
  margin: 0.1rem;
  background-color: #010f27;
}
</style>
