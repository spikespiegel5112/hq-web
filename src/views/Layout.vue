<template>
  <div class="layout_container" ref="layoutRef">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
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

import Header from "@/components/Header.vue";
import { screenBannerInfoRequest } from "@/api/screen";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  stuffDutyList: [] as any[],
  bannerInfo: {},
});

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById("line-scale");
  lineScaleEl.style.display = "none";
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  .ant-layout {
    height: 100%;
  }

  // &:before {
  //   content: "";
  //   display: inline-block;
  //   width: 0;
  //   height: 100%;
  // }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 50px 50px 100px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    pointer-events: visible;

    .main {
      display: flex;
      padding: 1.45rem 0 0 0;
      width: 100%;
      justify-content: space-between;
      position: relative;

      .middle {
        margin: 1rem 0 0 0;
        height: 4.5rem;
        z-index: 2;
      }

      .right {
        z-index: 1;
        // margin: 0 0.6rem 0 0;
      }
    }
  }

  .map {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    left: 0;
    top: 0;

    .content {
      margin: 0 auto;
      // width: 55rem;
      width: 48rem;
      height: 27rem;
      position: relative;
      // left: 4rem;
    }

    // z-index: -1;
  }
}
.debuggingtools {
  position: fixed;
  right: 1rem;
  top: 0.5rem;
  z-index: 2;
}
</style>
