<template>
  <Block
    side="left"
    width="narrow"
    height="long"
    title="出租车车辆监测"
  >
    <div class="taxivehiclemonitoring">
      <div class="top">
        <ul class="numberofparkinglots">
          <li>
            <span class="direction">
              <span class="bg"></span>
              <span class="text">南</span>
            </span>
            <div>
              蓄车场数
              <span class="number">
                <DigitFlipper
                  :digits="state.monitoringData.southTaxiParkingLotParkingCount || 0"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                  :top="0.1"
                />
              </span>
              <span class="unit">辆</span>
            </div>
          </li>
          <li>
            <span class="direction">
              <span class="bg"></span>
              <span class="text">北</span>
            </span>
            <div>
              蓄车场数
              <span class="number">
                <DigitFlipper
                  :digits="state.monitoringData.northTaxiParkingLotParkingCount || 0"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                  :top="0.1"
                />
              </span>
              <span class="unit">辆</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="background"></div>
        <ul>
          <li class="lefttop">
            <span class="direction">南1</span>
            <div>
              <span class="label">排队人数：</span>
              <span class="number color_F1BC4D">
                <DigitFlipper
                  :digits="state.monitoringData.southFirstTaxiBoardingPointWaitingCount"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />

                <span class="unit">人</span>
              </span>
            </div>
            <div>
              <span class="label">排队时长：</span>
              <span class="number color_4DCCF1">
                <DigitFlipper
                  :digits="state.monitoringData.southFirstTaxiBoardingPointWaitingTime"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">min</span></span
              >
            </div>
          </li>
          <li class="righttop">
            <span class="direction">南2</span>
            <div>
              <span class="label">排队人数：</span>
              <span class="number color_F1BC4D">
                <DigitFlipper
                  :digits="state.monitoringData.southSecondTaxiBoardingPointWaitingCount"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">人</span></span
              >
            </div>
            <div>
              <span class="label">排队时长：</span>
              <span class="number color_4DCCF1">
                <DigitFlipper
                  :digits="state.monitoringData.southSecondTaxiBoardingPointWaitingTime"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">min</span></span
              >
            </div>
          </li>
          <li class="leftbottom">
            <span class="direction">北1</span>
            <div>
              <span class="label">排队人数：</span>
              <span class="number color_F1BC4D">
                <DigitFlipper
                  :digits="state.monitoringData.northFirstTaxiBoardingPointWaitingCount"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">人</span></span
              >
            </div>
            <div>
              <span class="label">排队时长：</span>
              <span class="number color_4DCCF1">
                <DigitFlipper
                  :digits="state.monitoringData.northFirstTaxiBoardingPointWaitingTime"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">min</span></span
              >
            </div>
          </li>
          <li class="rightbottom">
            <span class="direction">北2</span>
            <div>
              <span class="label">排队人数：</span>
              <span class="number color_F1BC4D">
                <DigitFlipper
                  :digits="state.monitoringData.northSecondTaxiBoardingPointWaitingCount"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">人</span>
              </span>
            </div>
            <div>
              <span class="label">排队时长：</span>
              <span class="number color_4DCCF1">
                <DigitFlipper
                  :digits="state.monitoringData.northSecondTaxiBoardingPointWaitingTime"
                  :digitWidth="0.5"
                  :digitHeight="0.6"
                />
                <span class="unit">min</span></span
              >
            </div>
          </li>
        </ul>
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

import { screenTaxiVehicleMonitorRequest } from '@/api/screen';

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
  monitoringData: {
    southFirstTaxiBoardingPointWaitingCount: '',
    southFirstTaxiBoardingPointWaitingTime: '',
    southSecondTaxiBoardingPointWaitingCount: '',
    southSecondTaxiBoardingPointWaitingTime: '',
    southTaxiParkingLotParkingCount: '',

    northFirstTaxiBoardingPointWaitingCount: '',
    northFirstTaxiBoardingPointWaitingTime: '',
    northSecondTaxiBoardingPointWaitingCount: '',
    northSecondTaxiBoardingPointWaitingTime: '',
    northTaxiParkingLotParkingCount: '',
  } as any,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenTaxiVehicleMonitorRequest({})
    .then((response: any) => {
      console.log(response);
      console.log('=====screenTaxiVehicleMonitorRequest=====');
      response = response.data;
      setData(response);
      loopData();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const loopData = () => {
  let looperIndex = 0;
  let nextHourData = getNextTimeData(state.monitoringData);
  const looper = () => {
    setTimeout(() => {
      setData(nextHourData[looperIndex]);
      if (looperIndex < nextHourData.length) {
        looperIndex++;
        looper();
      }
    }, 5000);
  };
  looper();
};

const setData = (payload: any) => {
  // 北1上客点排队人数
  state.monitoringData.northFirstTaxiBoardingPointWaitingCount =
    payload.northFirstTaxiBoardingPointWaitingCount;
  // 北1上客点排队时长
  state.monitoringData.northFirstTaxiBoardingPointWaitingTime =
    payload.northFirstTaxiBoardingPointWaitingTime;
  // 北2上客点排队人数
  state.monitoringData.northSecondTaxiBoardingPointWaitingCount =
    payload.northSecondTaxiBoardingPointWaitingCount;
  // 北2上客点排队时长
  state.monitoringData.northSecondTaxiBoardingPointWaitingTime =
    payload.northSecondTaxiBoardingPointWaitingTime;
  // 北蓄车场蓄车数
  state.monitoringData.northTaxiParkingLotParkingCount = payload.northTaxiParkingLotParkingCount;

  // 南1上客点排队人数
  state.monitoringData.southFirstTaxiBoardingPointWaitingCount =
    payload.southFirstTaxiBoardingPointWaitingCount;
  // 南1上客点排队时长
  state.monitoringData.southFirstTaxiBoardingPointWaitingTime =
    payload.southFirstTaxiBoardingPointWaitingTime;
  // 南2上客点排队人数
  state.monitoringData.southSecondTaxiBoardingPointWaitingCount =
    payload.southSecondTaxiBoardingPointWaitingCount;
  // 南2上客点排队时长
  state.monitoringData.southSecondTaxiBoardingPointWaitingTime =
    payload.southSecondTaxiBoardingPointWaitingTime;
  // 南蓄车场蓄车数
  state.monitoringData.southTaxiParkingLotParkingCount = payload.southTaxiParkingLotParkingCount;
};

const getNextTimeData = (originalData: any) => {
  const result = [] as any[];
  result.push(originalData);
  let loopIndex = 0;

  const looper = () => {
    const nextTickData = {} as any;
    Object.keys(state.monitoringData).forEach((item: string) => {
      const randomNumber = Math.floor(Math.random() * 10);
      const randomDirection = Math.random() > 0.2 ? '' : '-';
      const randomNumberWithDirection = Number(randomDirection + randomNumber);
      let currentHourValue = 0;

      const ignoredKeyList = [
        'monitorTime',
        'p9EntranceCongestionSituation',
        'p9MainChannelLineUpSituation',
        'p9ExitCongestionSituation',
        'p9MainChannelLineUpSituation',
        'p10EntranceCongestionSituation',
        'p10ExitCongestionSituation',
        'p10MainChannelLineUpSituation',
      ];

      if (ignoredKeyList.some((item2: string) => item2 === item)) {
        nextTickData[item] = state.monitoringData[item];
      } else {
        currentHourValue = state.monitoringData[item] + randomNumber;
        nextTickData[item] = currentHourValue < 0 ? 0 : currentHourValue;
      }
    });

    result.push(nextTickData);

    if (loopIndex < 3600) {
      loopIndex++;
      looper();
    }
  };
  looper();
  console.log('result++++++======');
  console.log(result);

  return result;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.taxivehiclemonitoring {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  height: 100%;
  position: relative;

  .top {
    margin: 0.4rem 0;
    .numberofparkinglots {
      li {
        display: flex;
        margin: 0.1rem auto 0.4rem;
        width: 7rem;
        height: 1.6rem;
        background-image: url('@/assets/number-of-parkinglots-bg@2x.png');
        background-size: 90%;
        background-position: 0.7rem 0;
        background-repeat: no-repeat;
        color: #fff;
        align-items: center;

        .direction {
          width: 1.54rem;
          color: #00deff;
          font-size: 0.65rem;
          text-align: center;
          line-height: 1.5rem;
          position: relative;

          .text {
            position: relative;
          }

          .bg {
            display: block;
            width: 1.54rem;
            height: 1.54rem;
            position: absolute;
            top: 0;
            left: 0;
            background-image: url('@/assets/number-of-parkinglots-circle@2x.png');
            background-size: 100%;
            background-repeat: no-repeat;
            animation: spin 2s linear infinite;
            border-radius: 50%;
            border: 1px solid #00deff;
          }
        }

        > div {
          padding: 0 0 0 0.8rem;
          flex: 1;
          font-size: 0.4rem;

          .number {
            display: inline-block;
            padding: 0 0.1rem 0 0.2rem;
            color: #00f6ff;
          }

          .unit {
            display: inline-block;
            margin: 0 0 0 0.1rem;
            font-size: 0.3rem;
            line-height: 0.2rem;
          }
        }
      }
    }
  }

  .bottom {
    position: relative;
    margin: 0 auto;
    width: 7.7rem;
    height: 5.5rem;

    .background {
      width: 8rem;
      height: 6rem;
      background-image: url('@/assets/numberofparkinglotsineachdirection_bg@2x.png');
      background-size: 100%;
      background-repeat: no-repeat;
      position: absolute;
    }

    ul {
      margin: 0 auto;
      width: 7.1rem;
      height: 5.4rem;
      position: relative;
      font-size: 0.3rem;

      li {
        color: #fff;
        position: absolute;
        line-height: 0.6rem;
        > div {
          display: flex;
          align-items: center;
          .number {
            display: inline-flex;
            width: 1rem;
            align-items: center;
            .chartNum {
              // line-height: 0.3rem;
            }
          }
          .unit {
            display: inline-block;
            margin: 0 0 0 0.1rem;
            font-size: 0.3rem;
          }
        }

        .direction {
        }
      }

      .lefttop {
        text-align: left;
        top: 0;
        left: 0;
      }

      .righttop {
        text-align: right;
        top: 0;
        right: 0;
      }

      .leftbottom {
        text-align: left;
        bottom: 0;
        left: 0;
      }

      .rightbottom {
        text-align: right;
        bottom: 0;
        right: 0;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
