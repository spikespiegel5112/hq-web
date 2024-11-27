<template>
  <Block side="left" width="narrow" height="medium" title="客流疏散">
    <div class="evacuationofpassengerflow">
      <div id="evacuationofpassengerflow"></div>
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

let dataDictionary = [] as any[];

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

let myChart: any;
const initChart = () => {
  const chartDom = document.getElementById("evacuationofpassengerflow");
  myChart = global.$echarts.init(chartDom);
};

const setOption: EChartsOption = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 5,
      bottom: 20,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["50%", "60%"],
        center: ["30%", "45%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {},
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "出租车" },
          { value: 735, name: "网约车" },
          { value: 580, name: "地铁" },
          { value: 484, name: "公交" },
          { value: 300, name: "航班" },
          { value: 300, name: "其他" },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  setOption();
  //   screenTimeDistFlowRequest({
  //     ...global.$store.state.app.currentQueryDateParams,
  //   })
  //     .then((response: any) => {
  //       console.log("=====screenTimeDistFlowRequest=====");
  //       console.log(response);
  //       response = response.data;
  //       transformData(response);
  //       setOption();
  //       updateData();
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
};

onMounted(() => {
  initChart();
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.evacuationofpassengerflow {
  width: 100%;
  height: 2rem;
  min-height: 1rem;
  max-height: 2rem;
  > div {
    width: 100%;
    height: 100%;
  }
}
</style>
