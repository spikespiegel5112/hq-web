<template>
  <div class="configurationcommon">
    {{global.$getDictionary('dateFeaturesType')}}
    <a-tabs v-model:activeKey="state.activeKey" @tabClick="handleChangeTab">
      <a-tab-pane
        v-for="item in global.$getDictionary('dateFeaturesType')"
        :key="item.value"
        :tab="item.label"
      >
        <ConfigurationCommonTab
          :dateType="item.value"
          :activeTabId="state.activeKey"
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

import ConfigurationCommonTab from "./ConfigurationCommonTab.vue";

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
  padding: 0.3rem;
  background-color: #010f27;
}
</style>
