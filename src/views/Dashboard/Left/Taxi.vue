<template>
  <Block title="出租车" class="taxi">
    <div class="top">
      <div class="direction">
        <span class="south"></span>
        <span class="north"></span>
      </div>
      <div class="main">
        <div class="left">
          <ul>
            <li>
              <span class="label">蓄车场数：</span>
              <span class="value">
                {{ state.southTaxiParkingLotParkingCount }}
              </span>
            </li>
            <li>
              <span class="label">入库速度：</span>
              <span class="value">
                {{ state.northTaxiParkingLotParkingIn }}
              </span>
            </li>
            <li>
              <span class="label">出库速度：</span>
              <span class="value">
                {{ state.northTaxiParkingLotParkingOut }}
              </span>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li>
              <span class="label">蓄车场数：</span>
              <span class="value">
                {{ state.northTaxiParkingLotParkingCount }}
              </span>
            </li>
            <li>
              <span class="label">入库速度：</span>
              <span class="value">
                {{ state.southTaxiParkingLotParkingIn }}
              </span>
            </li>
            <li>
              <span class="label">出库速度：</span>
              <span class="value">
                {{ state.southTaxiParkingLotParkingOut }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <QueueTime />
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
import QueueTime from "./QueueTime.vue";

import { backendIndexPageTaxiVehicleMonitorNewRequest } from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
type EChartsOption = global.$echarts.EChartsOption;

const props = defineProps({
  text: {
    type: String,
    default: null,
    required: false,
  },
});

const state = reactive({
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
}) as any;

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  backendIndexPageTaxiVehicleMonitorNewRequest({})
    .then((response: any) => {
      response = response.data;
      Object.keys(state).forEach((item: any) => {
        state[item] = response[item];
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {
  getData();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.taxi {
  width: 100%;
  height: 100%;
  max-height: 5rem;
  .top {
    height: 100%;
    .direction {
      display: flex;
      width: 100%;
      height: 0.7rem;
      justify-content: space-between;
      span {
        display: inline-block;
        margin: 0.2rem 0.1rem 0 0.1rem;
        width: 0.45rem;
        height: 0.45rem;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .south {
        background-image: url("@/assets/taxi_south.png");
      }
      .north {
        background-image: url("@/assets/taxi_north.png");
      }
    }
    .main {
      display: flex;
      margin: 0 0 0.1rem 0;
      justify-content: space-between;
      width: 100%;
      height: 1.45rem;
      background-image: url("@/assets/taxi_bg.png");
      // background-size: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      // background-position: 0 -0.1rem;
      background-position: center;
      > div {
        display: inline-block;
        width: 1.6rem;
        ul {
          padding: 0.1rem 0 0 0.2rem;
          li {
            padding: 0.2rem 0 0 0;
            font-size: 0.15rem;
          }
        }
      }
      .left {
        margin: 0 0 0 0.6rem;
        ul {
          li {
            .label {
              color: #00b1a6;
            }
            .value {
              color: #00ffbd;
            }
          }
        }
      }
      .right {
        margin: 0 1rem 0 0;
        ul {
          li {
            .label {
              color: #1d8b9b;
            }
            .value {
              color: #30e5ff;
            }
          }
        }
      }
    }
  }
}
</style>
