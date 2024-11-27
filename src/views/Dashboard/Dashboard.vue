<template>
  <div class="dashboard">
    <Left class="left"></Left>
    <Middle class="middle"></Middle>
    <Right></Right>
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

import Left from "./Left/Left.vue";
import Middle from "./Middle/Middle.vue";
import Right from "./Right.vue";

import { screenBannerInfoRequest } from "@/api/screen";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  stuffDutyList: [] as any[],
  bannerInfo: {},
});

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById("line-scale");
  lineScaleEl.style.display = "none";
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  padding: 0.1rem;
  width: 100%;
  height: 100%;
  min-height: 100%;
  align-items: start;
  .left {
    display: inline-block;
    width: 7rem;
  }
  .middle {
    display: inline-block;
    margin: 0 0 0 0.2rem;
    width: 7rem;
  }
}
</style>
