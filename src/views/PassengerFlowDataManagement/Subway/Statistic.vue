<template>
  <div class="statistic_wrapper">
    <ul>
      <li>
        <div class="title">今日累计进站数</div>
        <div class="content">
          <div>
            <span class="value">{{ props.statisticData.inTotal }}</span>
            <span class="unit">人次</span>
          </div>
        </div>
      </li>
      <li>
        <div class="title">今日累计出站数</div>
        <div class="content">
          <div>
            <span class="value">{{ props.statisticData.outTotal }}</span>
            <span class="unit">人次</span>
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
    height: 2rem;
    li {
      display: flex;
      justify-content: center;
      height: 1rem;

      .title {
        display: inline-flex;
        margin: 0.2rem 0.35rem;
        width: 2.3rem;
        height: 0.6rem;
        align-items: center;
        justify-content: center;
        color: #00baff;
        font-size: 0.3rem;
        background-image: url("@/assets/subway_statisticborder1.png");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .content {
        display: inline-flex;
        width: 4rem;
        height: 0.9rem;
        align-items: center;
        justify-content: center;
        background-image: url("@/assets/subway_statisticborder2.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
        > div {
          display: inline-flex;
          height: 0.65rem;
          .value {
            display: inline-flex;
            height: 0.65rem;
            color: #00baff;
            font-size: 0.45rem;
            align-items: center;
            font-family: LEEFONTMENGHEI;
          }
          .unit {
            display: inline-flex;
            padding: 0 0 0 0.3rem;
            align-items: end;
            color: #6a88e4;
          }
        }
      }
    }
  }
}
</style>
