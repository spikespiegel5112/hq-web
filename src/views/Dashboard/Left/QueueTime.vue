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
import { backendIndexPageTaxiVehicleMonitorNewRequest } from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

const dataDictionary: any[] = [
  {
    name: "南1",
    key: "southOneTaxiParkingLotParkingQueueTime",
    value: null,
  },
  {
    name: "南2",
    key: "southTwoTaxiParkingLotParkingQueueTime",
    value: null,
  },
  {
    name: "北1",
    key: "northOneTaxiParkingLotParkingQueueTime",
    value: null,
  },
  {
    name: "北2",
    key: "northTwoTaxiParkingLotParkingQueueTime",
    value: null,
  },
];

const props = defineProps({
  text: {
    type: String,
    default: null,
    required: false,
  },
});

const state = reactive({
  chartData: {
    northTaxiParkingLotParkingCount: null,
    southTaxiParkingLotParkingCount: null,
    northTaxiParkingLotParkingIn: null,
    northTaxiParkingLotParkingOut: null,
    southTaxiParkingLotParkingIn: null,
    southTaxiParkingLotParkingOut: null,
    northOneTaxiParkingLotParkingQueueCount: null,
    northTwoTaxiParkingLotParkingQueueCount: null,
    southOneTaxiParkingLotParkingQueueCount: null,
    southTwoTaxiParkingLotParkingQueueCount: null,
    northOneTaxiParkingLotParkingQueueTime: null,
    northTwoTaxiParkingLotParkingQueueTime: null,
    southOneTaxiParkingLotParkingQueueTime: null,
    southTwoTaxiParkingLotParkingQueueTime: null,
  } as any,
});

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
  // console.log(dataDictionary)
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
      data: dataDictionary.map((item: any) => item.name),
    },
    series: [
      {
        type: "bar",
        color: "#FCB501",
        barWidth: "10",
        data: dataDictionary.map((item: any) => item.value),
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  backendIndexPageTaxiVehicleMonitorNewRequest({
    queryTime: global.$dayjs().format("YYYY-MM-DD HH:mm:ss"),
  })
    .then((response: any) => {
      response = response.data;
      Object.keys(response).forEach((item: any) => {
        dataDictionary.forEach((item2: any) => {
          if (item === item2.key) {
            item2.value = response[item];
          }
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
.queuetime {
  width: 100%;
  height: calc(100% - 2.5rem);
  min-height: 1rem;
  max-height: 3rem;
  color: #fcb501;

  .chart {
    width: 100%;
    height: calc(100% - 0.25rem);
  }
}
</style>
