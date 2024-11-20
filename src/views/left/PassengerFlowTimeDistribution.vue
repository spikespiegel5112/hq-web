<template>
  <Block
    side="left"
    width="narrow"
    height="medium"
    title="客流时间分布"
  >
    <div class="passengerflowtimedistribution">
      <div id="passengerflowtimedistribution"></div>
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
} from 'vue';

import { screenTimeDistFlowRequest } from '@/api/screen.ts';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

let xAxis = [] as string[];

interface PassengerFlowTimeDistributionType {
  dispersedHourlyPassengerCount: number;
  estimatedHourlyArrivePassengerCount: number;
  statisticalBeginHour: number;
}

let dataDictionary = [] as PassengerFlowTimeDistributionType[];

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const state = reactive({
  realtimeData: [] as any[],
  estimateData: [] as any[],
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

let myChart: any;
const initChart = () => {
  const chartDom = document.getElementById('passengerflowtimedistribution');
  myChart = global.$echarts.init(chartDom);
};

const transformData = (payload: any) => {
  const hoursIndex = [] as number[];
  let currentHour = global.$dayjs().subtract(1, 'hour').format('HH');
  currentHour = Number(currentHour);
  for (let i = 0; i < 24; i++) {
    hoursIndex.push(i);
  }
  console.log(dataDictionary);
  dataDictionary = [];
  hoursIndex.forEach((item2: any) => {
    const timeData = payload.find((item3: any) => item3.statisticalBeginHour === item2);
    if (timeData) {
      dataDictionary.push({
        ...timeData,
        dispersedHourlyPassengerCount:
          item2 <= currentHour ? timeData.dispersedHourlyPassengerCount : 0,
      });
    } else {
      dataDictionary.push({
        dispersedHourlyPassengerCount: 0,
        estimatedHourlyArrivePassengerCount: 0,
        statisticalBeginHour: item2,
      });
    }
  });
  console.log(dataDictionary);
};

const updateData = () => {
  let currentHour = global.$dayjs().subtract(1, 'hour').format('HH');
  currentHour = Number(currentHour);
  let loopIndex = 0;
  const looper = () => {
    const randomDirection = Math.random() > 0.2 ? '' : '-';
    const randomNumber = Math.floor(Math.random() * 100);
    const randomNumberWithDirection = Number(randomDirection + randomNumber);
    let dispersedHourlyPassengerCount = dataDictionary[currentHour].dispersedHourlyPassengerCount;
    dispersedHourlyPassengerCount = dispersedHourlyPassengerCount + randomNumberWithDirection;
    dispersedHourlyPassengerCount =
      dispersedHourlyPassengerCount > 0 ? dispersedHourlyPassengerCount : 0;
    dataDictionary[currentHour].dispersedHourlyPassengerCount = dispersedHourlyPassengerCount;

    setTimeout(() => {
      if (loopIndex < 3600) {
        loopIndex++;
        setOption();
        looper();
      }
    }, 5000);
  };
  looper();
};

const setOption = () => {
  const option = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // type: 'shadow'
      },
    },
    legend: {
      textStyle: {
        color: '#fff',
      },
      right: 20,
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '15%',
      bottom: '5%',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: '#fff',
        fontSize: '0.2rem',
      },
      splitLine: {
        lineStyle: {
          color: '#666',
        },
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#fff',
        fontSize: '0.2rem',
      },
      data: dataDictionary.map((item: any) => item.statisticalBeginHour + 1),
    },
    series: [
      {
        name: '预测',
        type: 'line',
        // label: {
        //   show: true,
        //   position: 'top',
        //   color: '#fff'
        // },

        color: '#49E6FF',
        data: dataDictionary.map((item: any) => item.estimatedHourlyArrivePassengerCount),
      },
      {
        name: '实时',
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: '#fff',
        },
        itemStyle: {
          color: function (param: any) {
            if (param.dataIndex > 0 && param.dataIndex < 6) {
              return new global.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(242, 240, 71, 1)' },
                { offset: 0.8, color: 'rgba(242, 240, 71, 0.8)' },
                { offset: 1, color: 'rgba(242, 240, 71, 0)' },
              ]);
            } else if (param.dataIndex >= 6 && param.dataIndex < 12) {
              return new global.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(242, 240, 71, 1)' },
                { offset: 0.5, color: 'rgba(242, 240, 71, 0.5)' },
                { offset: 1, color: 'rgba(242, 240, 71, 0)' },
              ]);
              // return 'yellow'
            } else if (param.dataIndex >= 12 && param.dataIndex < 22) {
              return new global.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(191,61,49,1)' },
                { offset: 0.5, color: 'rgba(191,61,49,0.5)' },
                { offset: 1, color: 'rgba(191,61,49,0)' },
              ]);
              // return '#bf3d31'
            } else {
              return new global.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(88,15,217,1)' },
                { offset: 0.5, color: 'rgba(88,15,217,0.5)' },
                { offset: 1, color: 'rgba(88,15,217,0)' },
              ]);
              // return '#580fd9'
            }
            // return countryColors[param.value[3]] || '#5470c6';
          },
        },
        color: '#F2F047',
        data: dataDictionary.map((item: any) => item.dispersedHourlyPassengerCount),
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  screenTimeDistFlowRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenTimeDistFlowRequest=====');
      console.log(response);
      response = response.data;
      transformData(response);
      setOption();
      updateData();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {
  initChart();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.passengerflowtimedistribution {
  width: 100%;
  height: 100%;

  > div {
    height: 8.5rem;
  }
}
</style>
