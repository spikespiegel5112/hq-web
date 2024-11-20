<template>
  <Block
    side="left"
    width="narrow"
    height="medium"
    title="停车库车辆监测"
  >
    <div class="parkinggaragevehiclemonitoring">
      <div class="statistic">
        <div class="top">
          <ul>
            <li class="left">
              <span class="label">主通道：</span>
              <span class="status">
                {{
                global.$store.state.dictionary.mainChannelLineUpSituation.find((item: any) => item.value ===
                  state.monitoringData.p9EntranceCongestionSituation)?.title
                }}
              </span>
            </li>
            <li class="right">
              <span class="label">车位占用数：</span>
              <span class="count color_00FF9C">
                <span>
                  <DigitFlipper
                    :digits="state.monitoringData.p9ParkingPlaceTotalOccupied"
                    :digitWidth="0.3"
                    :digitHeight="0.55"
                  />
                </span>
                个
              </span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <span class="patency">
            <span>P9</span>
          </span>
          <div class="arrow">
            <div class="left">
              <span class="label">入口排队长度/时间</span>
              <span class="trafficstatus">
                {{
                global.$store.state.dictionary.mainChannelCongestionSituation.find((item: any) => item.value ===
                  state.monitoringData.p9EntranceCongestionSituation)?.title
                }}
              </span>
              <span class="data"
                >≈
                <DigitFlipper
                  :digits="state.monitoringData.p9EntranceLineUpLength"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                m/
                <DigitFlipper
                  :digits="state.monitoringData.p10EntranceLineUpTime"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                min
              </span>
            </div>
            <div class="right">
              <span class="label">出口排队长度/时间</span>
              <span class="trafficstatus">
                {{
                global.$store.state.dictionary.mainChannelCongestionSituation.find((item: any) => item.value ===
                  state.monitoringData.p9EntranceCongestionSituation)?.title


                }}
              </span>
              <span class="data">
                ≈
                <DigitFlipper
                  :digits="state.monitoringData.p9ExitLineUpLength"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                m/
                <DigitFlipper
                  :digits="state.monitoringData.p10ExitLineUpTime"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                min
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="statistic">
        <div class="top">
          <ul>
            <li class="left">
              <span class="label">主通道：</span>
              <span class="status">
                {{ global.$store.state.dictionary.mainChannelLineUpSituation.find((item: any) => item.value ===
                  state.monitoringData.p10EntranceCongestionSituation)?.title }}
              </span>
            </li>
            <li class="right">
              <span class="label">车位占用数：</span>
              <span class="count color_FF6000">
                <span>
                  <DigitFlipper
                    :digits="state.monitoringData.p9ParkingPlaceTotalOccupied"
                    :digitWidth="0.3"
                    :digitHeight="0.5"
                  />
                </span>
                个
              </span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <span class="patency">
            <span>P10</span>
          </span>
          <div class="arrow">
            <div class="left">
              <span class="label">入口排队长度/时间</span>
              <span class="trafficstatus">
                {{
                global.$store.state.dictionary.mainChannelCongestionSituation.find((item: any) => item.value ===
                  state.monitoringData.p10EntranceCongestionSituation)?.title

                }}
              </span>
              <span class="data">
                ≈
                <DigitFlipper
                  :digits="state.monitoringData.p10EntranceLineUpLength"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                m/
                <DigitFlipper
                  :digits="state.monitoringData.p10EntranceLineUpTime"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                min
              </span>
            </div>
            <div class="right">
              <span class="label">出口排队长度/时间</span>
              <span class="trafficstatus">{{
                global.$store.state.dictionary.mainChannelCongestionSituation.find((item: any) => item.value ===
                  state.monitoringData.p10EntranceCongestionSituation)?.title

              }}</span>
              <span class="data">
                ≈
                <DigitFlipper
                  :digits="state.monitoringData.p10ExitLineUpLength"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                m/
                <DigitFlipper
                  :digits="state.monitoringData.p10ExitLineUpTime"
                  :digitWidth="0.3"
                  :digitHeight="0.5"
                />
                min
              </span>
            </div>
          </div>
        </div>
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

import { screenParkingVehicleMonitorRequest } from '@/api/screen';

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
    p9EntranceCongestionSituation: '',
    p9EntranceLineUpLength: '',
    p9EntranceLineUpTime: '',
    p9ExitCongestionSituation: '',
    p9ExitLineUpLength: '',
    p9ExitLineUpTime: '',
    p9MainChannelLineUpSituation: '',
    p9ParkingPlaceTotalOccupied: '',
    p10EntranceCongestionSituation: '',
    p10EntranceLineUpLength: '',
    p10EntranceLineUpTime: '',
    p10ExitCongestionSituation: '',
    p10ExitLineUpLength: '',
    p10ExitLineUpTime: '',
    p10MainChannelLineUpSituation: '',
    p10ParkingPlaceTotalOccupied: '',
  } as any,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenParkingVehicleMonitorRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenParkingVehicleMonitorRequest=====');
      console.log(response);
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
  // P9
  // P9入口拥堵情况
  state.monitoringData.p9EntranceCongestionSituation = payload.p9EntranceCongestionSituation;

  // P9入口排队长度
  state.monitoringData.p9EntranceLineUpLength = payload.p9EntranceLineUpLength;
  // P9入口排队时间
  state.monitoringData.p9EntranceLineUpTime = payload.p9EntranceLineUpTime;
  // P9出口拥堵情况
  state.monitoringData.p9ExitCongestionSituation = payload.p9ExitCongestionSituation;
  // P9出口排队长度
  state.monitoringData.p9ExitLineUpLength = payload.p9ExitLineUpLength;
  // P9出口排队时间
  state.monitoringData.p9ExitLineUpTime = payload.p9ExitLineUpTime;
  // P9主通道排队情况
  state.monitoringData.p9MainChannelLineUpSituation = payload.p9MainChannelLineUpSituation;
  // P9车位占用总数
  state.monitoringData.p9ParkingPlaceTotalOccupied = payload.p9ParkingPlaceTotalOccupied;
  // P10
  // P10入口拥堵情况
  state.monitoringData.p10EntranceCongestionSituation = payload.p10EntranceCongestionSituation;
  // P10入口排队长度
  state.monitoringData.p10EntranceLineUpLength = payload.p10EntranceLineUpLength;
  // P10入口排队时间
  state.monitoringData.p10EntranceLineUpTime = payload.p10EntranceLineUpTime;
  // P10出口拥堵情况
  state.monitoringData.p10ExitCongestionSituation = payload.p10ExitCongestionSituation;
  // P10出口拥堵情况
  state.monitoringData.p10ExitLineUpLength = payload.p10ExitLineUpLength;
  // P10出口排队时间
  state.monitoringData.p10ExitLineUpTime = payload.p10ExitLineUpTime;
  // P10主通道排队情况
  state.monitoringData.p10MainChannelLineUpSituation = payload.p10MainChannelLineUpSituation;
  // P10车位占用总数
  state.monitoringData.p10ParkingPlaceTotalOccupied = payload.p10ParkingPlaceTotalOccupied;
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
.parkinggaragevehiclemonitoring {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;

  .statistic {
    margin: 0.3rem 0 0 0;
    padding: 0 0 0.3rem 0;

    .top {
      ul {
        display: flex;
        justify-content: space-around;

        li {
          display: flex;
          align-items: center;
          padding: 0 0.2rem;
          width: 3.6rem;
          height: 1rem;
          line-height: 1rem;
          color: #fff;
          background-color: #063b64;
          font-size: 0.3rem;

          .label {
            width: 2.2rem;
          }

          .status {
            height: 0.5rem;
            line-height: 0.5rem;
            background-color: #265b3b;
            border: 1px solid #00ff9c;
            text-align: center;
            border-radius: 0.1rem;
          }

          .count {
            display: inline-flex;
            flex: 1;
            align-items: center;
            span {
              display: flex;
              font-family: 'ZhenyanGB-Regular';
            }
          }
        }
      }
    }

    .bottom {
      margin: 0.4rem 0 0 0;
      padding: 0 0.3rem;
      position: relative;

      .arrow {
        display: flex;
        box-sizing: border-box;

        .left,
        .right {
          flex: 1;
          width: 50%;
          color: #fff;
          position: relative;
          font-size: 0.3rem;

          .label {
            display: block;
          }

          .trafficstatus {
            display: block;
            color: #00ff9c;
          }

          .data {
            display: inline-flex;
            align-items: center;
            margin: 0.5rem 0 0 0;
            font-family: 'ZhenyanGB-Regular';
          }
        }

        .left {
          text-align: left;

          .trafficstatus {
            margin: 0.35rem 0 0 2.3rem;
          }

          .data {
            color: #11fff9;
          }
        }

        .right {
          text-align: right;

          .trafficstatus {
            margin: 0.35rem 2rem 0 0;
          }

          .data {
            color: #1989ff;
          }
        }
      }

      .patency {
        display: block;
        width: 7.5rem;
        height: 2rem;
        background-image: url('@/assets/traffic-import-and-export@2x.png');
        background-size: 70%;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;

        span {
          display: inline-block;
          margin: 0.2rem 0 0 0;
          width: 100%;
          text-align: center;
          font-size: 0.4rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
