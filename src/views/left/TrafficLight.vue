<template>
  <Block
    side="left"
    width="wide"
    height="short"
  >
    <div class="trafficlight">
      <ul>
        <li>
          <div
            class="green"
            :class="{ on: state.bannerInfo.peakDayType === 0 }"
          ></div>
        </li>
        <li>
          <div
            class="yellow"
            :class="{ on: state.bannerInfo.peakDayType === 1 }"
          ></div>
        </li>
        <li>
          <div
            class="red"
            :class="{ on: state.bannerInfo.peakDayType === 2 }"
          ></div>
        </li>
      </ul>
      <p>当日 23:00后发往上海虹桥的列车延误，影响旅客 2107 人次，最晚一班列车为次日 00:18 分。</p>
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

import { screenRollInfoRequest } from '@/api/screen';

const props = defineProps({
  bannerInfo: {
    type: Object,
    default: {},
    required: true,
  },
});

const state = reactive({
  bannerInfo: {},
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

watch(
  () => props.bannerInfo,
  (newValue: any, oldValue: any) => {
    state.bannerInfo = newValue;
  }
);

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.trafficlight {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  height: 100%;
  position: relative;

  p {
    padding: 0 0.4rem;
    color: #f6ff00;
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    text-align: left;
    font-size: 0.38rem;
  }

  ul {
    display: flex;
    margin: 0 auto;
    width: 13rem;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    li {
      display: inline-block;
      margin: 0 0 1rem 0;
      width: 2rem;
      height: 2rem;

      div {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
      }

      .red {
        background-image: url('@/assets/light-red@2x.png');
      }

      .yellow {
        background-image: url('@/assets/light-yellow@2x.png');
      }

      .green {
        background-image: url('@/assets/light-green@2x.png');
      }

      .red,
      .yellow,
      .green {
        opacity: 0.5;

        &.on {
          opacity: 1;
        }
      }
    }
  }
}
</style>
