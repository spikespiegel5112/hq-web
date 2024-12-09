<template>
  <div class="dashboard">
    <Left class="left"></Left>
    <Middle class="middle"></Middle>
    <Right class="right"></Right>
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
import Right from "./Right/Right.vue";

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const state = reactive({
  bannerInfo: {},
});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  padding: 0.1rem;
  width: 100%;
  height: calc(100vh - 1.7rem);
  // min-height: 100%;
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
  .right {
    display: inline-block;
    margin: 0 0 0 0.2rem;
    flex: 1;
  }
}
</style>
