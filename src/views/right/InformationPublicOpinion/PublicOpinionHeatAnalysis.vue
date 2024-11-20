<template>
  <div class="publicopinionheatanalysis">
    <div id="publicopinionheatanalysis"></div>
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
} from 'vue';

import { screenComplaintInfoRequest } from '@/api/screen.ts';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const state = reactive({});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

let complaintTypeDictionary = global.$store.state.dictionary.complaintType;
let complaintSensitiveDictionary = global.$store.state.dictionary.complaintSensitive;

let myChart: any;
const initChart = () => {
  var chartDom = document.getElementById('publicopinionheatanalysis');
  myChart = global.$echarts.init(chartDom);
};

const setOption = () => {
  console.log(complaintSensitiveDictionary);

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '10%',
      bottom: '5%',
      containLabel: true,

      // borderColor: 'red'
    },
    legend: {
      data: complaintSensitiveDictionary.map((item: any) => item.title),
      textStyle: {
        color: '#fff',
      },
      right: 0,
      // selectorPosition: 'end'
    },
    yAxis: [
      {
        type: 'category',
        data: complaintTypeDictionary.map((item: any) => item.title),
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: '#fff',
        },
      },
    ],

    xAxis: {
      type: 'value',
      name: '',
      interval: 5,
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        lineStyle: {
          color: '#666',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
          textColor: '#000',
        },
      },
    },
    series: [
      {
        name: '非敏感',
        type: 'bar',
        stack: 'total',
        color: '#3CDDF7',
        barWidth: 10,

        tooltip: {},
        data: complaintSensitiveDictionary
          .find((item1: any) => item1.value === 1)
          .complaintTypeDictionary.map((item1: any) => item1.value),
      },
      {
        name: '中性',
        type: 'bar',
        stack: 'total',
        color: '#FFD200',
        barWidth: 10,

        tooltip: {},
        data: complaintSensitiveDictionary
          .find((item1: any) => item1.value === 2)
          .complaintTypeDictionary.map((item1: any) => item1.value),
      },
      {
        name: '敏感',
        type: 'bar',
        stack: 'total',
        color: '#FF6600',
        barWidth: 10,

        tooltip: {},
        data: complaintSensitiveDictionary
          .find((item1: any) => item1.value === 3)
          .complaintTypeDictionary.map((item1: any) => item1.value),
      },
    ],
  };

  option && myChart.setOption(option);
};

const getData = () => {
  screenComplaintInfoRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      response = response.data;
      transformData(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const transformData = (payload: any) => {
  //
  console.log(complaintTypeDictionary);
  complaintSensitiveDictionary.forEach((item1: any) => {
    item1.complaintTypeDictionary = complaintTypeDictionary
      .map((item2: any) => {
        return {
          ...item2,
          title: item2.title,
          complaintType: item2.value,
        };
      })
      .map((item2: any) => {
        const complaintSensitiveValue = payload.filter(
          (item3: any) =>
            item3.complaintSensitive === item1.value && item3.complaintType === item2.complaintType
        ).length;

        const result = {
          ...item2,
          complaintSensitiveValue,
        };
        if (complaintSensitiveValue > 0) {
        }

        return result;
      });
  });
  setOption();
  // complaintTypeDictionary
};

onMounted(() => {
  initChart();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.publicopinionheatanalysis {
  // padding: 0rem 0.3rem;
  height: 3.5rem;

  #publicopinionheatanalysis {
    width: 100%;
    height: 100%;
  }

  .regionalclassification {
    li {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      background-image: url('@/assets/hexagon@2x.png');
      background-size: 100%;
      background-position: center;
      color: #fff;

      span {
        display: block;
        text-align: center;
      }

      .number {
        margin: 0.2rem 0 0.05rem 0;
        font-size: 0.27rem;
      }

      .title {
        margin: 0 auto;
        font-size: 0.17rem;
        color: #c4f7ff;
        width: 0.6rem;
      }
    }
  }
}
</style>
