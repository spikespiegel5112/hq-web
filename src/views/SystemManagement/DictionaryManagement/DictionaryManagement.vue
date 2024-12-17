<template>
  <div class="common_tab_container">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane key="DictionaryManagementItem" tab="字典项">
        <DictionaryManagementItem
          :dictionaryNameList="state.dictionaryNameList"
          @onUpdateDictionaryNameList="handleUpdateDictionaryList"
        />
      </a-tab-pane>
      <a-tab-pane key="DictionaryManagementName" tab="字典名称">
        <DictionaryManagementName
          :dictionaryNameList="state.dictionaryNameList"
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

import { dictionaryManageGetDictPagingRequest } from "@/api/management";

import DictionaryManagementItem from "./DictionaryManagementItem/DictionaryManagementItem.vue";
import DictionaryManagementName from "./DictionaryManagementName/DictionaryManagementName.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const state = reactive({
  activeKey: "DictionaryManagementItem",
  dictionaryNameList: [] as any[],
});

const getDictionaryNameList = () => {
  dictionaryManageGetDictPagingRequest({
  })
    .then((response: any) => {
      state.dictionaryNameList = response.data.list;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleUpdateDictionaryList = (list: any[]) => {
  getDictionaryNameList();
};

onMounted(async () => {
  getDictionaryNameList();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
