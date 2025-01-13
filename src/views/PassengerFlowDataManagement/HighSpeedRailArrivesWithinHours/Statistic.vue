<template>
  <div class="statistic_wrapper">
    <ul>
      <li>
        <div class="title">今日累计到达</div>
        <div class="content">
          <span class="value">
            {{ props.statisticData.estimatedArrivedTodayFlightPassengerCount }}
          </span>
          <span class="unit">万人次</span>
        </div>
        <div class="content">
          <span class="value">
            {{ props.statisticData.estimatedArrivedTodayTrainsCount }}
          </span>
          <span class="unit">列次</span>
        </div>
      </li>
      <li>
        <div class="title">今日累计出发</div>
        <div class="content">
          <span class="value">
            {{ props.statisticData.estimatedDepartedTodayPassengerCount }}
          </span>
          <span class="unit">万人次</span>
        </div>
        <div class="content">
          <span class="value">
            {{ props.statisticData.estimatedDepartedTodayTrainsCount }}
          </span>
          <span class="unit">列次</span>
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
      width: 6rem;
      height: 2rem;
      background-image: url("@/assets/passenger_statisticborder.png");
      background-size: contain;
      background-repeat: no-repeat;
      align-items: center;
      position: relative;
      justify-content: space-around;
      .title {
        margin: 0.2rem 0.35rem;
        font-size: 0.25rem;
        position: absolute;
        top: 0;
        left: 0;
      }
      .content {
        display: inline-block;
        margin: 0.5rem 0 0 0;
        height: 0.75rem;
        align-items: end;
        justify-content: center;
        .value {
          margin: 0 0.1rem 0 0;
          color: #0be3f5;
          font-size: 0.5rem;
          font-family: LEEFONTMENGHEI;
        }
        .unit {
          color: #6a88e4;
        }
      }
    }
  }
}
</style>
