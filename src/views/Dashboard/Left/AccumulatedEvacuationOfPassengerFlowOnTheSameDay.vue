<template>
  <Block
    title="当日小时疏散客流"
    class="accumulatedevacuationofpassengerflowonthesameday"
  >
    <div id="accumulatedevacuationofpassengerflowonthesameday"></div>
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

import { backendIndexPageTodayFlowAcceleratedRequest } from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

let xAxis = [] as string[];
const dataDictionary = [] as any[];

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
  const chartDom = document.getElementById(
    "accumulatedevacuationofpassengerflowonthesameday"
  );
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
    legend: {
      textStyle: {
        color: "#fff",
      },
      right: 20,
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
        name: "实时",
        type: "line",
        label: {
          show: false,
          position: "top",
          color: "#",
        },
        color: "#FFFC00",
        smooth: true,
        areaStyle: {
          color: new global.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(240, 255, 0, 1)",
            },
            {
              offset: 1,
              color: "rgba(240, 255, 0, 0)",
            },
          ]),
        },
        data: dataDictionary.map((item: any) => item.value),
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  backendIndexPageTodayFlowAcceleratedRequest({
    ...global.$store.state.app.currentQueryDateParams,
    timeType: 1,
  })
    .then((response: any) => {
      response = response.data;
      response.forEach((item: any, index: number) => {
        dataDictionary.push({
          title: index,
          value: item.dispersedHourlyPassengerCount,
        });
      });
      setOption();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {
  initChart();
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.accumulatedevacuationofpassengerflowonthesameday {
  width: 100%;
  height: calc(100% - 1.5rem);
  min-height: 1rem;
  max-height: 3rem;
  position: relative;
  > div {
    width: 100%;
    height: calc(100% - 1.2rem);
  }
}
</style>
