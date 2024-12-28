<template>
  <Block title="" class="queuetime">
    <div class="title">排队时间</div>
    <div class="chart" id="queuetime"></div>
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
import { color } from "echarts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

let xAxis = [] as string[];
const dataDictionary: any[] = [];
for (let index = 0; index < 4; index++) {
  dataDictionary.push({
    title: index,
    value: Math.floor(Math.random() * 3000),
  });
}

const props = defineProps({
  text: {
    type: String,
    default: null,
    required: false,
  },
});

const state = reactive({});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {}
);

let myChart: any;
const initChart = () => {
  const chartDom = document.getElementById("queuetime");
  myChart = global.$echarts.init(chartDom);
};

const setOption: EChartsOption = () => {
  const option = {
    title: {
      text: null,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // type: 'shadow'
      },
    },

    grid: {
      left: "3%",
      right: "4%",
      top: "15%",
      bottom: "3%",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: "#fff",
        fontSize: "0.15rem",
      },
      splitLine: {
        lineStyle: {
          color: "#0a1737",
        },
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#fff",
        fontSize: "0.15rem",
      },
      data: dataDictionary.map((item: any) => item.title),
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        data: [10, 52, 200, 334, 390, 330, 220],
        color: "#FCB501",
        barWidth: "10",
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  setOption();
};

onMounted(() => {
  initChart();
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.queuetime {
  width: 100%;
  height: calc(100% - 2.5rem);
  min-height: 1rem;
  max-height: 3rem;
  color: #fcb501;

  .chart {
    width: 100%;
    height: calc(100% - 0.35rem);
  }
}
</style>
