<template>
  <div class="statistic_wrapper">
    <ul>
      <li>
        <div class="icon">
          <div class="bg"></div>
          <div class="taxi"></div>
        </div>
        <div class="right">
          <div class="title">
            <span class="circle"></span>
            今日累计到达
          </div>
          <div class="content">
            <span class="value">{{ props.statisticData.inCount }}</span>
          </div>
        </div>
      </li>
      <li>
        <div class="icon">
          <div class="bg"></div>
          <div class="taxi"></div>
        </div>
        <div class="right">
          <div class="title">
            <span class="circle"></span>
            今日累计离开
          </div>
          <div class="content">
            <span class="value">{{ props.statisticData.outCount }}</span>
          </div>
        </div>
      </li>
    </ul>
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
} from "vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  statisticData: {
    type: Object,
    default: false,
  },
});

const emit = defineEmits<{}>();

const formDataRef: any = ref(null);

const state = reactive({
  visible: false,
  formData: {
    statisticalBeginHour: null,
    statisticalDateBegin: null,
    statisticalDateEnd: null,
  },
  statisticalDate: [],
});

watch(
  () => state.formData,
  (newValue: any, oldValue: any) => {},
  { deep: true }
);

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.statistic_wrapper {
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3rem;

    li {
      display: flex;
      align-items: center;
      width: 6rem;
      position: relative;
      .icon {
        display: flex;
        margin: 0 0 0 0.2rem;
        width: 1.8rem;
        height: 1.8rem;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-image: url("@/assets/taxi_statistic/circle.png");
          background-size: contain;
          background-repeat: no-repeat;
          animation: spin 3s infinite linear;
        }
        .taxi {
          width: 0.7rem;
          height: 0.7rem;
          background-image: url("@/assets/taxi_statistic/online_car_hailing.png");
          background-size: contain;
          background-repeat: no-repeat;
          z-index: 1;
        }
      }
      .right {
        width: 100%;
        background-image: url("@/assets/taxi_statistic/bg.png");
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 0 0 2rem;
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.2rem 0 0 0;
          font-size: 0.25rem;
          color: #00c3ff;
          .circle {
            display: inline-flex;
            align-items: center;
            margin: 0 0.1rem 0 0;
            padding: 0.05rem;
            width: 0.2rem;
            height: 0.2rem;
            border: 1px solid #00c3ff;
            border-radius: 50%;
            &:before {
              content: "";
              display: inline-block;
              width: 0.1rem;
              height: 0.1rem;
              background-color: #00c3ff;
              border-radius: 50%;
            }
          }
        }
        .content {
          display: flex;
          height: 0.75rem;
          align-items: center;
          justify-content: center;
          .value {
            color: #00c3ff;
            font-size: 0.4rem;
            font-family: LEEFONTMENGHEI;
          }
        }
      }
    }
  }
}
</style>
