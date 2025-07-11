<template>
  <Block side="left" width="narrow" height="medium" title="小时客流">
    <div class="hourlypassengerflow">
      <div id="hourlypassengerflow"></div>
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

import { backendIndexPageFlowHourlyNewRequest } from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

let dataDictionary = [
  {
    title: "地铁",
    name: "dispersedMetroPassengerCount",
    value: null,
  },
  {
    title: "高铁",
    name: "highSpeedRailwayPassengerCount",
    value: null,
  },
] as any[];

const props = defineProps({
  text: {
    type: String,
    default: null,
    required: false,
  },
});

const state = reactive({
  dispersedTaxiPassengerCount: null,
  dispersedEhailingPassengerCount: null,
  dispersedParkingPassengerCount: null,
  dispersedMetroPassengerCount: null,
  dispersedOthersPassengerCount: null,
  statisticalDate: null,
  statisticalBeginHour: null,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {}
);

let myChart: any;
const initChart = () => {
  const chartDom = document.getElementById("hourlypassengerflow");
  if (chartDom) {
    myChart = global.$echarts.init(chartDom);
  }
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
        name: "",
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
        data: dataDictionary
          .filter((item: any) => {
            return global.$isNotEmpty(item.value);
          })
          .map((item: any) => {
            return {
              value: item.value,
              name: item.title,
            };
          }),
      },
    ],
  };
  option && myChart.setOption(option);
};

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  setOption();
  backendIndexPageFlowHourlyNewRequest({
    ...global.$store.state.app.currentQueryDateParams,
    hour: 1,
    timeType: 1,
  })
    .then((response: any) => {
      response = response.data;
      transformData(response);
      setOption();
      // updateData();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const transformData = (response: any) => {
  dataDictionary.forEach((item: any) => {
    item.value = response[item.name];
  });
};

onMounted(() => {
  initChart();
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hourlypassengerflow {
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
