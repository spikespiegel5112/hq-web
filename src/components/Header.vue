<template>
  <div class="common_jeader_wrapper">
    <a-col class="left">
      <span class="currenttime"> {{ state.currentTime }}</span>
      <span>
        {{ global.$store.state.dictionary.weekday.find((item: any) => item.value
        === global.$dayjs().weekday()).title
        }}</span
      >
      <span> {{ props.bannerInfo.peakDayTypeName }}</span>

      <span>
        <img
          :src="global.$getImageUrl('../assets/weather/' + global.$store.state.dictionary.weather.find((item: any) => item.value === props.bannerInfo.weatherIcon)?.fileName)"
          alt=""
        />
      </span>
      <span> {{ props.bannerInfo.weatherCondition }}</span>
    </a-col>
    <h1>虹桥枢纽运行管理一体化平台</h1>
    <div class="right">
      <ul v-if="stuffDutyList.length > 0">
        <li>
          <span class="title">总值班：</span>
          <span class="name">{{ stuffDutyList[0].staffName }}</span>
        </li>
        <li>
          <span class="title">值班人员：</span>
          <span class="name">{{ stuffDutyList[0].hocStaffName }}</span>
        </li>
        <li>
          <span class="title">电话：</span>
          <span class="name">{{ stuffDutyList[0].staffPhone }}</span>
        </li>
      </ul>
    </div>
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

const props = defineProps({
  bannerInfo: {
    type: Object,
    default: {},
    required: true,
  },
  stuffDutyList: {
    type: Array,
    default: [],
    required: true,
  },
  title: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  currentTime: '',
  clientWidth: 0,
  bannerInfo: {} as any,
});

const blockSize = computed(() => {
  return props.width + '-' + props.height;
}) as any;

watch(
  () => props.bannerInfo,
  (newValue: any, oldValue: any) => {
    initClock();
  }
);

const initClock = () => {
  setInterval(() => {
    state.currentTime = global.$dayjs().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_jeader_wrapper {
  display: flex;
  width: 100%;
  min-height: 1.8rem;
  background: url('@/assets/tip@2x.png');
  background-repeat: no-repeat;
  background-size: 100%;
  align-items: start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  h1 {
    margin: 0 auto 0;
    width: 15rem;
    line-height: 2rem;
    font-size: 1rem;
    color: #fff;
    font-weight: bold;
  }

  .left {
    flex: 1;
    margin: 0.25rem 0 0 1.5rem;
    color: #c6ddff;
    font-size: 0.5rem;
    text-align: left;

    .currenttime {
      display: inline-block;
      width: 5.5rem;
    }

    span {
      margin: 0 0 0 0.4rem;
    }
  }

  .right {
    flex: 1;
    margin: 0.25rem 2rem 0 1.5rem;
    text-align: left;
    font-size: 0.5rem;
    text-align: right;
    color: #c6ddff;

    ul {
      li {
        display: inline-block;
        margin: 0 0 0 0.4rem;

        .title {
          margin: 0 0 0 0.4rem;
        }
      }
    }
  }
}
</style>
