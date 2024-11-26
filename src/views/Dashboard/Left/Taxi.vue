<template>
  <Block title="出租车" class="taxi">
    <div class="top">
      <div class="direction">
        <span class="south"></span>
        <span class="north"></span>
      </div>
      <div class="main">
        <div class="left">
          <ul>
            <li>
              <span class="label">蓄车场数:</span>
              <span class="value">11111</span>
            </li>
            <li>
              <span class="label">入库速度:</span>
              <span class="value">11111</span>
            </li>
            <li>
              <span class="label">出库速度:</span>
              <span class="value">11111</span>
            </li>
          </ul>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </Block>
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

import { screenTimeDistFlowRequest } from "@/api/screen.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

let xAxis = [] as string[];
const dataDictionary = [];
for (let index = 0; index < 22; index++) {
  dataDictionary.push({
    title: index,
    value: Math.floor(Math.random() * 3000),
  });
}

const props = defineProps({
  text: {
    type: String,
    default: "",
    required: false,
  },
});

const state = reactive({});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {};

onMounted(() => {
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.taxi {
  width: 100%;
  height: 4rem;
  .top {
    .direction {
      display: flex;
      width: 100%;
      height: 0.5rem;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .south {
        background-image: url("@/assets/taxi_south.png");
      }
      .north {
        background-image: url("@/assets/taxi_south.png");
      }
    }
    .main {
      width: 100%;
      height: 3rem;
      background-image: url("@/assets/taxi_bg.png");
      background-size: contain;
      background-repeat: no-repeat;
      .left{
        padding: 0.5rem 0 0 0;
        ul{
          li{

            margin: 0.2rem 0 0 0;
          }
        }
      }
    }
  }
}
</style>
