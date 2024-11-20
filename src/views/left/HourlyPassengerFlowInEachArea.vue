<template>
  <Block
    side="left"
    width="wide"
    height="long"
    title="各区域小时客流"
  >
    <div class="hourlypassengerflowineacharea">
      <ASpace size="large">
        <div class="left">
          <div class="top">
            <CommonTitle title="地铁" />
            <ul class="statistic">
              <li>
                <!-- 
                
                p9p10InParking
                p9p10OutParking
                ehailingNorthInParking
                ehailingNorthOutParking
                ehailingWestInParking
                ehailingWestOutParking -->
                <span class="circle"></span>

                <p>
                  {{ global.$dayjs().format('DD') }}日（{{
                    global.$store.state.app.currentPeriod
                  }}）进站共计
                </p>

                <span class="numberofpeople">
                  <DigitFlipper :digits="state.monitoringData.metroInHourTotal" />
                  <span class="unit">人</span>
                </span>
              </li>
              <li>
                <span class="circle"></span>
                {{ global.$store.state.app.lastOneHourDate }}
                <p>
                  {{ global.$dayjs().format('DD') }}日（{{
                    global.$store.state.app.currentPeriod
                  }}）出站共计
                </p>

                <span class="numberofpeople">
                  <DigitFlipper :digits="state.monitoringData.metroOutHourTotal" />
                  <span class="unit">人</span>
                </span>
              </li>
            </ul>
            <div class="numberofpeople">
              <ul>
                <li>
                  <span class="number">
                    <DigitFlipper
                      :digits="state.monitoringData.metroInTotal"
                      :digitWidth="0.35"
                      :digitHeight="0.7"
                    />
                  </span>
                  <span class="ring"></span>
                  <span class="name">进站</span>
                </li>
                <li>
                  <span class="number">
                    <DigitFlipper
                      :digits="state.monitoringData.metroOutTotal"
                      :digitWidth="0.35"
                      :digitHeight="0.7"
                    />
                  </span>
                  <span class="ring"></span>
                  <span class="name">出站</span>
                </li>
              </ul>
            </div>
          </div>

          <CommonTitle
            class="taxirailwaytitle"
            title="出租车（高铁）"
          />
          <div class="bottom">
            <div class="total">
              <p>
                {{ global.$dayjs().format('DD') }}
                日（
                {{ global.$store.state.app.currentPeriod }}
                ）发车共计
              </p>
              <div class="progress">
                <span class="progressbar">
                  <i></i>
                </span>
                <span class="number">
                  <DigitFlipper
                    :digits="state.monitoringData.railwayTaxiTotalDepartureCount"
                    :digitWidth="0.35"
                    :digitHeight="0.55"
                  />
                  辆
                </span>
              </div>
            </div>

            <div class="statistic">
              <div class="pickuppoint">
                <span class="left">北上客点</span>
                <span class="right">南上客点</span>
              </div>
              <ul>
                <li>
                  <div class="statisticbar left green">
                    <span class="unit">人</span>
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.railwayTaxiNorthPassengerFlow"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                  </div>
                  <div class="label">累计发车人数</div>
                  <div class="statisticbar right green">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.railwayTaxiSouthPassengerFlow"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
                <li>
                  <div class="statisticbar left red">
                    <span class="unit">人</span>
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.northTaxiParkingLotParkingCount"
                        :digitWidth="0.24"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                  </div>
                  <div class="label">蓄车数</div>
                  <div class="statisticbar right red">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.southTaxiParkingLotParkingCount"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
                <li>
                  <div class="statisticbar left blue">
                    <span class="unit">人</span>
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.railwayTaxiNorthDepartureCount"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                  </div>
                  <div class="label">发车总数</div>
                  <div class="statisticbar right blue">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.railwayTaxiSouthDepartureCount"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <CommonTitle title="车库流量信息" />
            <div class="header">进库 / 出库</div>
            <ul>
              <li>
                <div class="title aligncenter">
                  <p>P9</p>
                  <p>P10</p>
                </div>
                <div class="rowlist">
                  <div class="row">
                    <span class="period">{{ global.$store.state.app.currentPeriod }} </span>
                    <span class="dash">-</span>
                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.p9p10TotalInParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.p9p10TotalOutParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit">辆</span>
                    </span>
                  </div>
                  <div class="row">
                    <span class="period">截止{{ global.$dayjs().format('HH') }}:00</span>
                    <span class="dash">-</span>
                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.p9p10InParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.p9p10OutParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit">辆</span>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">快速上客点北</div>
                <div class="rowlist">
                  <div class="row">
                    <span class="period">{{ global.$store.state.app.currentPeriod }} </span>
                    <span class="dash">-</span>
                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.p9GroundEhailingInParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.p9GroundEhailingOutParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit"> 辆 </span>
                    </span>
                  </div>
                  <div class="row">
                    <span class="period">截止{{ global.$dayjs().format('HH') }}:00</span>
                    <span class="dash">-</span>
                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.ehailingNorthInParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.ehailingNorthOutParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit">辆</span>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">快速上客点西</div>
                <div class="rowlist">
                  <div class="row">
                    <span class="period">{{ global.$store.state.app.currentPeriod }} </span>
                    <span class="dash">-</span>

                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.longDistanceEhailingInParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.longDistanceEhailingOutParkingLotCount"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit"> 辆 </span>
                    </span>
                  </div>
                  <div class="row">
                    <span class="period">截止{{ global.$dayjs().format('HH') }}:00</span>
                    <span class="dash">-</span>
                    <span class="data">
                      <DigitFlipper
                        :digits="state.monitoringData.ehailingWestInParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      /
                      <DigitFlipper
                        :digits="state.monitoringData.ehailingWestOutParking"
                        :digitWidth="0.35"
                        :digitHeight="0.25"
                        :top="0"
                      />
                      <span class="unit">辆</span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <CommonTitle title="出租车（市域铁）" />
            <div class="total">
              <p>
                {{ global.$dayjs().format('DD') }}日（{{
                  global.$store.state.app.currentPeriod
                }}）发车共计
              </p>
              <div class="progress">
                <span class="progressbar">
                  <i></i>
                </span>
                <span class="number">
                  <DigitFlipper
                    :digits="state.monitoringData.railwayAndUrbanTaxiTotalDepartureCount"
                    :digitWidth="0.35"
                    :digitHeight="0.55"
                  />
                  辆
                </span>
              </div>
            </div>

            <div class="statistic">
              <div class="pickuppoint"></div>
              <ul>
                <li>
                  <div class="label">排队人数</div>
                  <div class="statisticbar green">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.urbanRailwayTaxiPassengerWaitingCount || 0"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
                <li>
                  <div class="label">蓄车数</div>
                  <div class="statisticbar red">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.urbanRailwayTaxiParkingCount || 0"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
                <li>
                  <div class="label">发车总数</div>
                  <div class="statisticbar blue">
                    <span class="number">
                      <DigitFlipper
                        :digits="state.monitoringData.urbanRailwayTaxiDepartureCount || 0"
                        :digitWidth="0.35"
                        :digitHeight="0.5"
                        :top="0.1"
                      />
                    </span>
                    <span class="unit">人</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ASpace>
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

import { screenHocHourRequest } from '@/api/screen.ts';

import DigitFlipper from '@/components/DigitFlipper.vue';

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
    // 地铁进站共计数
    metroInTotal: 0,
    // 地铁出站共计数
    metroOutTotal: 0,
    // P9P10截止时间点的进库数据
    p9p10InParking: 0,
    // P9P10截止时间点的出库数据
    p9p10OutParking: 0,
    // 网约车北截止时间点的进库数据
    ehailingNorthInParking: 0,
    // 网约车北截止时间点的出库数据
    ehailingNorthOutParking: 0,
    // 网约车西截止时间点的进库数据
    ehailingWestInParking: 0,
    // 网约车西截止时间点的出库数据
    ehailingWestOutParking: 0,
    // 地铁1小时进站共计数
    metroInHourTotal: 0,
    // 地铁1小时出站共计数
    metroOutHourTotal: 0,

    // 长途网约车上客点进库(车次)快速上客点西
    longDistanceEhailingInParkingLotCount: 0,
    // 长途网约车上客点出库(车次)快速上客点西
    longDistanceEhailingOutParkingLotCount: 0,
    longDistanceEhailingPassengerFlow: 0,
    northTaxiBoardingPointWaitingCount: 0,
    northTaxiParkingLotArrivalSituation: 0,
    // 蓄车数
    // 出租车蓄车场蓄车情况北蓄（辆）
    northTaxiParkingLotParkingCount: 0,
    // P9小车进库(车次)
    p9CarInParkingLotCount: 0,
    // P9小车出库(车次)
    p9CarOutParkingLotCount: 0,
    p9CarPassengerFlow: 0,
    // P9地面网约车上客点进库(车次)快速上客点北
    p9GroundEhailingInParkingLotCount: 0,
    // P9地面网约车上客点出库(车次)快速上客点北
    p9GroundEhailingOutParkingLotCount: 0,
    p9GroundEhailingPassengerFlow: 0,
    p9ParkingPlaceOccupied: 0,
    // P9P10合计进库(车次)
    p9p10TotalInParkingLotCount: 0,
    // P9P10合计出库(车次)
    p9p10TotalOutParkingLotCount: 0,
    // P10小车进库(车次)
    p10CarInParkingLotCount: 0,
    // P10小车出库(车次)
    p10CarOutParkingLotCount: 0,
    p10CarPassengerFlow: 0,
    p10ParkingPlaceOccupied: 0,
    p91fBusInParkingLotCount: 0,
    p91fBusOutParkingLotCount: 0,
    p91fBusPassengerFlow: 0,
    // 出租车发车合计铁路南+铁路北+出租车（市域铁）
    railwayAndUrbanTaxiTotalDepartureCount: 0,
    // 发车总数
    // 铁路出租车北发车（车次）
    railwayTaxiNorthDepartureCount: 0,
    // 累计发车人数
    // 铁路出租车北客流（人次）
    railwayTaxiNorthPassengerFlow: 0,
    // 发车总数
    // 铁路出租车南发车（车次）
    railwayTaxiSouthDepartureCount: 0,
    // 累计发车人数
    // 铁路出租车南客流（人次）
    railwayTaxiSouthPassengerFlow: 0,
    railwayTaxiTotalDepartureCount: 0,
    railwayTaxiTotalPassengerFlow: 0,
    remark: '',
    southTaxiBoardingPointWaitingCount: 0,
    southTaxiParkingLotArrivalSituation: 0,
    // 蓄车数
    // 出租车蓄车场蓄车情况南蓄（辆）
    southTaxiParkingLotParkingCount: 0,
    statisticalBeginHour: 0,
    statisticalDate: 0,
    updateTime: 0,
    // 出租车（市域铁）发车（车次）
    urbanRailwayTaxiDepartureCount: 0,
    // 出租车（市域铁）蓄车数量
    urbanRailwayTaxiParkingCount: 0,
    // 出租车（市域铁）客流（人次）
    urbanRailwayTaxiPassengerFlow: 0,
    // 出租车（市域铁）排队人数
    urbanRailwayTaxiPassengerWaitingCount: 0,
  } as any,
});

const currentPeriod = computed(() => {
  return global.$store.state.app.currentPeriod;
}) as any;

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

watch(
  () => global.$store.state.app.currentPeriod,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {
  screenHocHourRequest({
    ...global.$store.state.app.currentQueryHourParams,
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenHocHourRequest=====');
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
    }, 3000);
  };
  looper();
};

const setData = (payload: any) => {
  Object.keys(state.monitoringData).forEach((item: string) => {
    state.monitoringData[item] = payload[item];
  });
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
        'northTaxiParkingLotArrivalSituation',
        'remark',
        'southTaxiParkingLotArrivalSituation',
        'statisticalDate',
        'updateTime',
      ];

      const reduceKeyList = [
        {
          sumKey: 'p9p10InParking',
          addendKey: 'p9p10TotalInParkingLotCount',
        },
        {
          sumKey: 'p9p10OutParking',
          addendKey: 'p9p10TotalOutParkingLotCount',
        },
        {
          sumKey: 'ehailingNorthInParking',
          addendKey: 'p9GroundEhailingInParkingLotCount',
        },
        {
          sumKey: 'ehailingNorthOutParking',
          addendKey: 'p9GroundEhailingOutParkingLotCount',
        },
        {
          sumKey: 'ehailingWestInParking',
          addendKey: 'longDistanceEhailingInParkingLotCount',
        },
        {
          sumKey: 'ehailingWestOutParking',
          addendKey: 'longDistanceEhailingOutParkingLotCount',
        },
      ];

      if (ignoredKeyList.some((item2: string) => item2 === item)) {
        nextTickData[item] = state.monitoringData[item];
      } else {
        if (reduceKeyList.some((item2) => item2.sumKey === item || item2.addendKey === item)) {
          const current = result.map((item3: any, index3: number) => item3[item]);
          const addendKey: any = reduceKeyList.find((item3) => item3.sumKey === item)?.addendKey;
          if (item === 'p9p10InParking') {
          }
          const sum = current.reduce((prev, curr) => {
            return curr + randomNumber;
          });
          nextTickData[item] = sum;
          // console.log('=====');
          // console.log(item);
          // console.log(current);
          // console.log(sum);
          // console.log(nextTickData);
        } else {
          currentHourValue = state.monitoringData[item] + randomNumber;
          nextTickData[item] = currentHourValue < 0 ? 0 : currentHourValue;
        }
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

  return result;
};

const timer = () => {
  setInterval(() => {
    global.$store.dispatch('app/refreshCurrentPeriod');
  });
};

onMounted(() => {
  timer();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hourlypassengerflowineacharea {
  display: block;
  padding: 0.2rem 0.5rem 0 0.5rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  height: 100%;
  position: relative;
  vertical-align: top;

  .left {
    display: inline-block;

    .taxirailwaytitle {
      margin: 0.7rem 0 0.4rem 0;
    }

    .top {
      .common_title_item {
        margin: 0.05rem 0 0.4rem 0;
      }

      .statistic {
        li {
          display: flex;
          margin: 0.1rem auto;
          width: 6.1rem;
          height: 0.8rem;
          background-image: linear-gradient(to right, rgba(24, 64, 137, 1), rgba(24, 64, 137, 0));
          align-items: center;

          .circle {
            display: inline-block;
            margin: 0 0.2rem;
            width: 0.1rem;
            height: 0.1rem;
            background-color: #2feb52;
            border-radius: 50%;
          }

          p {
            display: inline-block;
            flex: 1;
            margin: 0;
            color: #fff;
            font-size: 0.25rem;
          }

          .numberofpeople {
            display: flex;
            width: 1.5rem;
            color: #1dd2ae;
            justify-content: end;
            font-size: 0.25rem;
            font-family: 'ZhenyanGB-Regular';
            align-items: center;
          }
        }
      }

      .numberofpeople {
        ul {
          display: flex;
          width: 90%;
          justify-content: center;

          li {
            display: inline-block;
            margin: 0 0.5rem 0 0.5rem;
            width: 1.7rem;
            height: 2.1rem;
            text-align: center;
            position: relative;

            .number {
              display: inline-block;
              margin: 0.3rem 0 0 0;
              font-size: 0.4rem;
              color: #fff;
              font-family: 'ZhenyanGB-Regular';
              text-align: right;
              .chartNum {
                width: 1rem;
              }
            }

            .ring {
              display: inline-block;
              width: 1.7rem;
              height: 1.5rem;
              background-image: url('@/assets/numberofpeople-bg@2x.png');
              background-size: 100%;
              position: absolute;
              top: 0.3rem;
              left: 0;
            }

            .name {
              display: block;
              width: 100%;
              font-size: 0.25rem;
              color: #fff;
              position: absolute;
              bottom: 0;
              text-align: center;
            }
          }
        }
      }
    }

    .bottom {
      width: 100%;
      padding: 0 0 0 0.1rem;

      .statistic {
        .statisticbar {
          padding: 0 0.1rem;

          .unit {
            font-size: 0.3rem;
          }

          .number {
            font-size: 0.3rem;
            font-family: 'ZhenyanGB-Regular';
          }

          &.left {
            .number {
              text-align: right;
            }
          }
        }
      }
    }
  }

  .right {
    display: inline-block;

    .top {
      height: 5.2rem;

      .header {
        margin: 0 0 0.1rem 0;
        padding: 0 1.5rem 0 0;
        text-align: right;
        font-size: 0.2rem;
        color: #fff;
      }

      ul {
        li {
          display: flex;
          width: 7rem;
          height: 1.4rem;
          background-image: url('@/assets/garagetrafficinformation_bg@2x.png');
          background-size: 100%;
          background-repeat: no-repeat;

          .title {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            color: #fff;
            padding: 0.35rem 0.32rem;
            font-size: 0.3rem;
            text-align: center;

            p {
              margin: 0;
            }
          }

          .rowlist {
            display: inline-block;
            margin: 0.1rem 0 0 0;
            flex: 1;

            .row {
              display: flex;
              padding: 0 0 0 0.4rem;
              height: 0.6rem;
              line-height: 0.6rem;
              color: #fff;
              font-size: 0.25rem;
              align-items: center;

              .period {
                display: inline-block;
                width: 1.75rem;
                color: #ffa800;
              }

              .dash {
                margin: 0 0.4rem;
              }

              .data {
                display: flex;
                width: 0.5rem;
                color: #fff;
                .chartNum {
                  ::v-deep {
                    .box-item {
                      .number-item {
                        span {
                          i {
                            background: -webkit-linear-gradient(
                              #8fdffe,
                              #00a8ff
                            ); /* Chrome, Safari */
                            -webkit-background-clip: text; /* Chrome, Safari */
                            background-clip: text;
                            -webkit-text-fill-color: transparent; /* Chrome, Safari */
                            color: transparent;
                          }
                        }
                      }
                    }
                  }
                }

                .unit {
                  margin: 0 0 0 0.1rem;
                  background: -webkit-linear-gradient(#8fdffe, #00a8ff); /* Chrome, Safari */
                  -webkit-background-clip: text; /* Chrome, Safari */
                  background-clip: text;
                  -webkit-text-fill-color: transparent; /* Chrome, Safari */
                  color: transparent;
                }
              }
            }
          }
        }
      }
    }

    .bottom {
      .common_title_item {
        margin: 0.45rem 0 0.4rem 0;
      }

      .statistic {
        margin: 0.75rem 0 0 0;

        ul {
          li {
            .unit {
              margin: 0 0.2rem 0 0;
              font-size: 0.3rem;
            }

            .statisticbar {
              padding: 0 0 0 0.2rem;
              font-size: 0.3rem;
              width: 4rem;
            }
          }
        }
      }
    }
  }

  .ant-space {
    width: 100%;
    align-items: flex-start;

    ::v-deep .ant-space-item {
      display: inline-block;
      width: 50%;
    }
  }

  .total {
    margin: 0 0 0.2rem 0;

    p {
      color: #fff;
      margin: 0;
      font-size: 0.3rem;
    }

    .progress {
      display: flex;
      align-items: center;

      .progressbar {
        display: inline-block;
        width: 4rem;
        height: 0.1rem;
        position: relative;
        background-color: #143046;

        i {
          display: inline-block;
          width: 50%;
          height: 100%;
          background-color: #1eab8f;
          position: absolute;
          top: 0;
        }
      }

      .number {
        display: flex;
        flex: 1;
        color: #1eab8f;
        text-align: center;
        font-size: 0.3rem;
        font-family: 'ZhenyanGB-Regular';
        align-items: center;
      }
    }
  }

  .statistic {
    color: #fff;

    .pickuppoint {
      margin: 0 0 0.2rem 0;
      // height: 0.5rem;

      span {
        display: inline-block;
        width: 50%;
        font-size: 0.3rem;
      }

      .right {
        text-align: right;
      }
    }

    ul {
      li {
        display: flex;
        margin: 0 0 0.1rem 0;
        justify-content: space-between;

        .label {
          font-size: 0.3rem;
          line-height: 0.5rem;
        }

        .statisticbar {
          display: flex;
          width: 2rem;
          height: 0.5rem;
          line-height: 0.5rem;
          justify-content: space-around;

          .number {
            width: 3rem;
            text-align: left;
            font-family: 'ZhenyanGB-Regular';
          }

          .unit {
            flex: 1;
            text-align: right;
            font-size: 0.2rem;
          }

          &.green {
            background-color: #1eab8f;
          }

          &.red {
            background-color: #ff6261;
          }

          &.blue {
            background-color: #0394d8;
          }
        }
      }
    }
  }
}
</style>
