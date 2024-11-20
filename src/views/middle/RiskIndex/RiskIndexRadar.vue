<template>
  <div
    class="riskindexradar"
    id="riskindexradar"
  ></div>
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

import { screenRadarChartRequest } from '@/api/screen';

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { color } from 'echarts';

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  chartData: {} as any,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const dataDictionary = [
  {
    name: 'exhibitionRiskProportion',
    title: '会展',
    value: '',
  },
  {
    name: 'passengerFlowRiskProportion',
    title: '客流',
    value: '',
  },
  {
    name: 'peakDayRiskProportion',
    title: '高峰日',
    value: '',
  },
  {
    name: 'rushHourRiskProportion',
    title: '高峰时段',
    value: '',
  },
  {
    name: 'weatherRiskProportion',
    title: '天气',
    value: '',
  },
];

let myChart: any;

const getData = () => {
  screenRadarChartRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenRadarChartRequest=====');
      console.log(response);
      state.chartData = response.data;
      transformData();
      setOption();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const initChart = () => {
  const chartDom = document.getElementById('riskindexradar')!;
  myChart = global.$echarts.init(chartDom);
};

const transformData = () => {
  let result = dataDictionary;
  result.forEach((item: any) => {
    item.value = state.chartData[item.name];
  });
};

const setOption = () => {
  type EChartsOption = echarts.ComposeOption<
    TitleComponentOption | LegendComponentOption | RadarSeriesOption
  >;
  let option: EChartsOption;

  option = {
    title: {},
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '会展', max: 100 },
        { name: '客流', max: 100 },
        { name: '高峰日', max: 100 },
        { name: '高峰时段', max: 100 },
        { name: '天气', max: 100 },
      ],
    },
    tooltip: {},
    axisLabel: {
      fontSize: 222,
    },
    series: [
      {
        type: 'radar',
        areaStyle: {},
        label: {
          color: '#fff',
        },
        data: [
          {
            value: dataDictionary.map((item) => item.value),
            name: '',
          },
        ],
      },
    ],
  };
  option && myChart.setOption(option);
};

onMounted(async () => {
  initChart();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.riskindexradar {
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
