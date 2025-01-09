<template>
  <div class="statistic_wrapper">
    <ul>
      <li>
        <div class="title">今日累计到达</div>
        <div class="content">
          <span class="value">{{ props.statisticData.inTotal }}</span>
          <span class="unit">人次</span>
        </div>
      </li>
      <li>
        <div class="title">今日累计出发</div>
        <div class="content">
          <span class="value">{{ props.statisticData.outTotal }}</span>
          <span class="unit">人次</span>
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
      width: 6rem;
      height: 2rem;
      background-image: url("@/assets/passenger_statisticborder.png");
      background-size: contain;
      background-repeat: no-repeat;
      .title {
        margin: 0.2rem 0.35rem;
        font-size: 0.25rem;
      }
      .content {
        display: flex;
        height: 0.75rem;
        align-items: end;
        justify-content: center;
        .value {
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
