<template>
  <Block
    side="middle"
    width="wide"
    height="short"
    title="风险指数"
  >
    <div class="riskindex">
      <div class="left">
        <CommonTitle title="今日客流" />
        <div class="statistic">
          <p>
            预计今日出发
            <span class="blue"> {{ state.monitoringData.estimatedDepartedTodayTrainsCount }} </span
            >列次、<span class="blue">
              {{ state.monitoringData.estimatedDepartedTodayPassengerCount }} </span
            >万人
          </p>
          <p>
            预计今日到达
            <span class="yellow"> {{ state.monitoringData.estimatedArrivedTodayTrainsCount }} </span
            >列次、<span class="yellow">
              {{ state.monitoringData.estimatedArrivedTodayPassengerCount }} </span
            >万人
          </p>
          <p>
            今日累计到达
            <span class="orange"> {{ state.monitoringData.arrivedTodayPassengerCount }} </span
            >万人、累计疏散<span class="green">
              {{ state.monitoringData.dispersedTodayPassengerCount }} </span
            >万人
          </p>
        </div>
        <div class="eta">
          ERC预计高铁到达数据(全天)>30w
          <span class="red">(红)</span>
          ;21w-29w
          <span class="yellow">(黄)</span>
          ;≤20w
          <span class="green">(绿)</span>
          。
        </div>
      </div>
      <div class="divideline">
        <div></div>
      </div>
      <div class="right">
        <RiskIndexRadar />
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
} from 'vue';

import { screenRadarChartRequest, screenTodayFlowRequest } from '@/api/screen';
import RiskIndexRadar from './RiskIndexRadar.vue';

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
  monitoringData: {
    arrivedTodayPassengerCount: '',
    dispersedTodayPassengerCount: '',
    estimatedArrivedTodayPassengerCount: '',
    estimatedArrivedTodayTrainsCount: '',
    estimatedDepartedTodayPassengerCount: '',
    estimatedDepartedTodayTrainsCount: '',
    statisticalBeginHour: '',
  },
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenTodayFlowRequest({
    ...global.$store.state.app.currentQueryHourParams,
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenTodayFlowRequest=====');
      console.log(response);

      response = response.data;
      state.monitoringData.arrivedTodayPassengerCount = response.arrivedTodayPassengerCount;
      state.monitoringData.dispersedTodayPassengerCount = response.dispersedTodayPassengerCount;
      state.monitoringData.estimatedArrivedTodayPassengerCount =
        response.estimatedArrivedTodayPassengerCount;
      state.monitoringData.estimatedArrivedTodayTrainsCount =
        response.estimatedArrivedTodayTrainsCount;
      state.monitoringData.estimatedDepartedTodayPassengerCount =
        response.estimatedDepartedTodayPassengerCount;
      state.monitoringData.estimatedDepartedTodayTrainsCount =
        response.estimatedDepartedTodayTrainsCount;
      state.monitoringData.statisticalBeginHour = response.statisticalBeginHour;
    })
    .catch((error: any) => {
      console.log(error);
    });
  screenRadarChartRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenRadarChartRequest=====');
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.riskindex {
  display: flex;
  padding: 0 0.4rem;
  width: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  height: 4.4rem;
  position: absolute;
  top: 0.15rem;
  align-items: start;
  box-sizing: border-box;
  .left {
    display: inline-block;
    padding: 0.5rem 0 0 0;
    width: 9rem;
    height: 100%;
    .red {
      color: red;
    }

    .blue {
      color: #00ccff;
    }

    .yellow {
      color: #ffd200;
    }

    .orange {
      color: #ff8a00;
    }

    .green {
      color: #00ff3c;
    }

    .statistic {
      padding: 0 0 0 1.5rem;
      color: #fff;

      p {
        margin: 0.3rem 0 0 0;
        font-size: 0.25rem;

        span {
          margin: 0 0.1rem;
          font-size: 0.35rem;
          top: 0.03rem;
          position: relative;
        }
      }
    }

    .eta {
      display: inline-block;
      margin: 0.7rem 0 0 0.9rem;
      padding: 0.1rem;
      color: #fff;
      font-size: 0.25rem;
    }
  }

  .divideline {
    display: flex;
    width: 2px;
    height: 5rem;
    align-items: center;
    div {
      display: flex;
      width: 2px;
      height: 2.5rem;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 122, 200, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  .right {
    display: inline-block;
    margin: 0 1rem;
    flex: 1;
    height: 4.4rem;
  }
}
</style>
