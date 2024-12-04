<template>
  <div class="dashboardmiddle">
    <div class="top common_block_wrapper">
      <AlarmList />
    </div>
    <div class="bottom common_block_wrapper">
      <EventHandlingList />
    </div>
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

import AlarmList from "./AlarmList.vue";
import EventHandlingList from "./EventHandlingList.vue";

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
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
.dashboardmiddle {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.9rem);
  position: relative;
  // color: #fff;
  .top {
    margin: 0 0 0.15rem 0;
    width: 100%;
    height: 55%;
    .currentpassengerflowquantity {
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 1rem;
        height: 1rem;
      }
      .detail {
        display: flex;
        flex: 1;
        height: 0.5rem;
        font-size: 0.2rem;
        text-align: left;
        align-items: center;
        background-image: linear-gradient(
          to right,
          rgba(18, 105, 146, 1),
          rgba(18, 105, 146, 0)
        );
        .title {
          display: inline-block;
          padding: 0 0 0 0.2rem;
          width: 3rem;
        }

        .data {
          display: inline-block;
          flex: 1;
          .number {
            display: inline-block;
            margin: 0 0.1rem 0 0;
            color: #f1bc4d;
            font-size: 0.3rem;
          }
          .unit {
            font-size: 0.16rem;
          }
        }
      }
    }
  }

  .bottom {
    height: 45%;
    position: relative;
  }
}
</style>
