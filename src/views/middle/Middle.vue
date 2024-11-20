<template>
  <div class="middle_container alignright">
    <ASpace :size="10">
      <RiskIndex />
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

import RiskIndex from '@/views/middle/RiskIndex/RiskIndex.vue'


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
.middle_container {
  margin: 0.1rem auto;
  width: 16rem;
  z-index: 1;
  position: relative;
}
</style>