<template>
  <div class="right_container alignright">
    <ASpace :size="10">
      <ExternalInformation />
      <ExternalInformationDisposal />
    </ASpace>

    <ASpace :size="10">
      <OperationPlan />
      <OperationPlanResponse />
    </ASpace>

    <ASpace :size="10">
      <EmergencyEvent />
      <EmergencyEventHandling />
    </ASpace>

    <ASpace :size="10">
      <InformationComplaint />
      <InformationPublicOpinion />
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
} from "vue";

import ExternalInformation from '@/views/right/ExternalInformation.vue'
import ExternalInformationDisposal from '@/views/right/ExternalInformationDisposal.vue'
import OperationPlan from '@/views/right/OperationPlan.vue'
import OperationPlanResponse from '@/views/right/OperationPlanResponse.vue'
import EmergencyEvent from '@/views/right/EmergencyEvent.vue'
import EmergencyEventHandling from '@/views/right/EmergencyEventHandling.vue'
import InformationComplaint from '@/views/right/InformationComplaint/InformationComplaint.vue'
import InformationPublicOpinion from '@/views/right/InformationPublicOpinion/InformationPublicOpinion.vue'




// import uuidv4 from "uuid";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const contentRef = ref(HTMLDivElement);
const chatListRef = ref(HTMLDivElement);

console.log(chatListRef);

const state = reactive({
  clientWidth: 0,
  mobileMode: false,
  isWeLink: false,
  pageReady: false,
  chatListFlag: true,
});

const contentStyle = computed(() => {
  let result = {
    height: "",
  };

  result.height =
    !!contentRef.value && contentRef.value.clientHeight > window.innerHeight
      ? "100%"
      : "auto";
  return result;
}) as any;

watch(
  () => state.pageReady,
  (newValue: any, oldValue: any) => {
    if (!!newValue) {
    }
  }
);


const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById('line-scale')
  lineScaleEl.style.display = 'none'
};


onMounted(async () => {
  init();
});

onBeforeUnmount(() => { });
</script>

<style scoped lang="scss">
.right_container {
  width: 30rem;
  text-align: right;
}
</style>