<template>
  <div class="common_accesslog_wrapper">
    <a-space>
      <a-button v-for="item in state.accessLogList">
        {{ item.meta.title }}
      </a-button>
    </a-space>
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

import { screenBannerInfoRequest } from "@/api/screen";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  accessLogList: [] as any[],
});

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {
    recordRoute(newValue);
  }
);

const recordRoute = (newValue: any) => {
  const matchedRouteList = newValue.matched;
  const newRoute = matchedRouteList.filter((item1: any) => {
    return (
      !state.accessLogList.find((item2: any) => item2.name === item1.name) &&
      item1.name !== "layout"
    );
  });
  if (newRoute.length > 0) {
    const lastOne = newRoute[newRoute.length - 1];
    if (lastOne.meta.title) {
      state.accessLogList.push(lastOne);
    }
  }
  console.log("newRoute");
  console.log(newRoute);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_accesslog_wrapper {
  display: flex;
  padding: 0 0.2rem;
  width: 100%;
  height: 0.6rem;
  align-items: center;
  .ant-form {
    width: 100%;
    .ant-form-item {
      margin: 0;
    }
    .operation {
      text-align: right;
    }
  }
}
</style>
