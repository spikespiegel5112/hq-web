<template>
  <Block
    side="left"
    width="narrow"
    height="medium"
    title="客流空间分布"
  >
    <div class="passengerflowspacedistribution">
      <div id="passengerflowspacedistribution"></div>
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

import {
  screenSpaceDistFlowEstimatedRequest,
  screenSpaceDistFlowRealtimeRequest,
} from '@/api/screen.ts';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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

const bannerInfo = computed(() => {
  return global.$store.state.app.bannerInfo;
}) as any;

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const dataDictionary = [
  {
    name: 'dispersedEhailingPassengerCount',
    estimatedNameList: [
      {
        name: 'estimatedDispersedEhailingHolidayPassengerCount',
        peakDayType: 2,
      },
      {
        name: 'estimatedDispersedEhailingNormalPassengerCount',
        peakDayType: 0,
      },
      {
        name: 'estimatedDispersedEhailingPeaKPassengerCount',
        peakDayType: 1,
      },
    ],
    title: '网约车',
    realTimeValue: 0,
    estimateValue: 0,
  },
  {
    name: 'dispersedMetroPassengerCount',
    estimatedNameList: [
      {
        name: 'estimatedDispersedMetroHolidayPassengerCount',
        peakDayType: 2,
      },
      {
        name: 'estimatedDispersedMetroNormalPassengerCount',
        peakDayType: 0,
      },
      {
        name: 'estimatedDispersedMetroPeaKPassengerCount',
        peakDayType: 1,
      },
    ],
    title: '地铁',
    realTimeValue: 0,
    estimateValue: 0,
  },
  {
    name: 'dispersedOthersPassengerCount',
    estimatedNameList: [
      {
        name: 'estimatedDispersedOthersHolidayPassengerCount',
        peakDayType: 2,
      },
      {
        name: 'estimatedDispersedOthersNormalPassengerCount',
        peakDayType: 0,
      },
      {
        name: 'estimatedDispersedOthersPeaKPassengerCount',
        peakDayType: 1,
      },
    ],
    title: '其他',
    realTimeValue: 0,
    estimateValue: 0,
  },
  {
    name: 'dispersedParkingPassengerCount',
    estimatedNameList: [
      {
        name: 'estimatedDispersedParkingHolidayPassengerCount',
        peakDayType: 2,
      },
      {
        name: 'estimatedDispersedParkingNormalPassengerCount',
        peakDayType: 0,
      },
      {
        name: 'estimatedDispersedParkingPeaKPassengerCount',
        peakDayType: 1,
      },
    ],
    title: '停车库',
    realTimeValue: 0,
    estimateValue: 0,
  },
  {
    name: 'dispersedTaxiPassengerCount',
    estimatedNameList: [
      {
        name: 'estimatedDispersedTaxiHolidayPassengerCount',
        peakDayType: 2,
      },
      {
        name: 'estimatedDispersedTaxiNormalPassengerCount',
        peakDayType: 0,
      },
      {
        name: 'estimatedDispersedTaxiPeaKPassengerCount',
        peakDayType: 1,
      },
    ],
    title: '出租车',
    realTimeValue: 0,
    estimateValue: 0,
  },
];

let myChart: any;
const initChart = () => {
  const chartDom = document.getElementById('passengerflowspacedistribution');
  myChart = global.$echarts.init(chartDom);
};

const transformData = (realtimeData: any, estimateData: any) => {
  dataDictionary.forEach((item: any) => {
    item.realTimeValue = Math.floor(realtimeData[item.name]);
    item.estimateValue =
      estimateData[
        item.estimatedNameList.find((item2: any) => {
          return item2.peakDayType === bannerInfo.value.peakDayType;
        })?.name
      ];
    item.estimateValue = Math.floor(item.estimateValue);
  });
  // ;
  // console.log(dataDictionary);
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
      bottom: '3%',
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
      data: dataDictionary.map((item: any) => item.title),
    },
    series: [
      {
        name: '预测',
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: '#fff',
        },
        color: '#49E6FF',
        data: dataDictionary.map((item: any) => item.estimateValue),
      },
      {
        name: '实时',
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: '#fff',
        },
        color: '#F2F047',
        data: dataDictionary.map((item: any) => item.realTimeValue),
      },
    ],
  };

  option && myChart.setOption(option);
};

const screenSpaceDistFlowRealtimeRequestPromise = () => {
  return new Promise((resolve, reject) => {
    screenSpaceDistFlowRealtimeRequest({
      dateType: bannerInfo.value.peakDayType,
      ...{
        hour: 17,
        queryDate: '2024-09-11 17:00:00',
      },
      // ...global.$store.state.app.currentQueryHourParams,
      // ...global.$store.state.app.currentQueryDateParams,
    })
      .then((response: any) => {
        console.log('=====screenSpaceDistFlowEstimatedRequest=====');
        console.log(response);
        response = response.data;
        resolve(response);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

const screenSpaceDistFlowEstimatedRequestPromise = () => {
  return new Promise((resolve, reject) => {
    screenSpaceDistFlowEstimatedRequest({
      dateType: bannerInfo.value.peakDayType,
      ...{
        hour: 17,
        queryDate: '2024-09-11 17:00:00',
      },
      // ...global.$store.state.app.currentQueryHourParams,
      // ...global.$store.state.app.currentQueryDateParams,
    })
      .then((response: any) => {
        console.log('=====screenSpaceDistFlowEstimatedRequest=====');
        console.log(response);
        response = response.data;

        resolve(response);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

const getData = () => {
  Promise.all([
    screenSpaceDistFlowRealtimeRequestPromise(),
    screenSpaceDistFlowEstimatedRequestPromise(),
  ])
    .then((response: any) => {
      console.log(response);
      const realtimeData = response[0];
      const estimateData = response[1];
      transformData(realtimeData, estimateData);
      setOption();
      let looperIndex = 0;
      let nextHourData = getNextTimeData(realtimeData, estimateData);
      const looper = () => {
        // console.log('looper' + looperIndex);
        // console.log(nextHourData[looperIndex]);
        setTimeout(() => {
          transformData(
            nextHourData[looperIndex].realtimeData,
            nextHourData[looperIndex].estimateData
          );
          setOption();
          if (looperIndex < nextHourData.length) {
            looperIndex++;
            looper();
          }
        }, 1000);
      };
      looper();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getNextTimeData = (realtimeData: any, estimateData: any) => {
  const result = [] as any[];

  for (let i = 0; i < 3600; i++) {
    const randomDirection = Math.random() > 0.2 ? '' : '-';
    const randomNumber = Math.floor(Math.random() * 10);
    const randomNumberWithDirection = Number(randomDirection + randomNumber);
    result.push({
      realtimeData: {
        dispersedEhailingPassengerCount:
          realtimeData.dispersedEhailingPassengerCount + randomNumberWithDirection,
        dispersedMetroPassengerCount:
          realtimeData.dispersedMetroPassengerCount + randomNumberWithDirection,
        dispersedOthersPassengerCount:
          realtimeData.dispersedOthersPassengerCount + randomNumberWithDirection,
        dispersedParkingPassengerCount:
          realtimeData.dispersedParkingPassengerCount + randomNumberWithDirection,
        dispersedTaxiPassengerCount:
          realtimeData.dispersedTaxiPassengerCount + randomNumberWithDirection,
      },
      estimateData: estimateData,
    });
  }

  return result;
};

onMounted(() => {
  initChart();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.passengerflowspacedistribution {
  width: 100%;
  height: 100%;

  > div {
    height: 8.35rem;
  }
}
</style>
