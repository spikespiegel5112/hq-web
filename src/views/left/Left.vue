<template>
  <div
    class="left_container alignleft"
    ref="leftRef"
  >
    <ASpace>
      <TrafficLight :bannerInfo="props.bannerInfo" />
      <OperationInformationDynamics />
    </ASpace>

    <ASpace
      class="alignleft"
      :size="10"
    >
      <ASpace
        class="alignleft"
        :size="0"
      >
        <PassengerFlowTimeDistribution />
        <PassengerFlowSpaceDistribution v-if="state.bannerInfoReady" />
      </ASpace>
      <ParkingGarageVehicleMonitoring />
    </ASpace>

    <ASpace>
      <HourlyPassengerFlowInEachArea />
      <TaxiVehicleMonitoring />
    </ASpace>
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

import Block from '@/components/Block.vue';
import TrafficLight from '@/views/left/TrafficLight.vue';
import OperationInformationDynamics from '@/views/left/OperationInformationDynamics.vue';
import ParkingGarageVehicleMonitoring from '@/views/left/ParkingGarageVehicleMonitoring.vue';
import PassengerFlowTimeDistribution from '@/views/left/PassengerFlowTimeDistribution.vue';
import PassengerFlowSpaceDistribution from '@/views/left/PassengerFlowSpaceDistribution.vue';
import TaxiVehicleMonitoring from '@/views/left/TaxiVehicleMonitoring.vue';
import HourlyPassengerFlowInEachArea from '@/views/left/HourlyPassengerFlowInEachArea.vue';

// import uuidv4 from "uuid";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const leftRef = ref(HTMLDivElement);
const contentRef = ref(HTMLDivElement);
const chatListRef = ref(HTMLDivElement);

console.log(chatListRef);

const props = defineProps({
  bannerInfo: {
    type: Object,
    default: {},
    required: true,
  },
});

const state = reactive({
  clientWidth: 0,
  mobileMode: false,
  isWeLink: false,
  pageReady: false,
  chatListFlag: true,
  bannerInfoReady: false,
});

const contentStyle = computed(() => {
  let result = {
    height: '',
  };

  result.height =
    !!contentRef.value && contentRef.value.clientHeight > window.innerHeight ? '100%' : 'auto';
  return result;
}) as any;

watch(
  () => global.$store.state.app.bannerInfo,
  (newValue: any, oldValue: any) => {
    if (!!newValue) {
      state.bannerInfoReady = true;
    }
  }
);

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById('line-scale');
  lineScaleEl.style.display = 'none';
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.left_container {
  width: 30rem;
  text-align: left;
  z-index: 1;

  .ant-space {
    align-items: normal;
  }
}
</style>
