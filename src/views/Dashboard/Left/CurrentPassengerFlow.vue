<template>
  <div class="currentpassengerflowquantity">
    <span class="icon"></span>
    <div class="detail">
      <span class="title">当前客流数量</span>
      <div class="data">
        <span class="number">{{ state.count }}</span>
        <span class="unit">人次</span>
      </div>
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

import { backendIndexPageTodayFlowAcceleratedRequest } from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const dataDictionary = [] as any[];

const props = defineProps({
  text: {
    type: String,
    default: "",
    required: false,
  },
});

const state = reactive({
  count: null,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {
  backendIndexPageTodayFlowAcceleratedRequest({
    ...global.$store.state.app.currentQueryDateParams,
    timeType: 1,
  })
    .then((response: any) => {
      response = response.data;
      const currentHour = global.$dayjs().format("HH");
      const result = response.find(
        (item: any) => item.statisticalBeginHour === Number(currentHour)
      );
      state.count = result.dispersedHourlyPassengerCount;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.currentpassengerflowquantity {
  display: flex;
  align-items: center;
  .icon {
    display: inline-block;
    margin: 0 0.2rem 0 0;
    width: 1rem;
    height: 1rem;
    background-image: url("@/assets/dashboard_passager.png");
    background-size: contain;
    background-repeat: no-repeat;
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
</style>
